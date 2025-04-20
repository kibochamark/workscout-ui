import { ColumnDef, FilterFn} from "@tanstack/react-table";
import { DataTableColumnHeader } from "../globalcomponents/ColumnHeader";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { bookmarkJob } from "@/app/data-access/actions/job.service";
import { toast } from "sonner";


export type Job = {
    id: string;
    jobName: string;
    workscoutId: string;
    company: string;
    category: string;
    appliedDate: string; // or Date, depending on your data
    status: string;
    bookmarked:boolean
};

// 1. Create a custom filter function for date range
const dateRangeFilterFn: FilterFn<Job> = (row, columnId, value: string | null) => {


    const dateApplied = new Date(row.getValue(columnId));
    const filterdDate = new Date(value as string);
  
    if (!filterdDate) {
      return true; // No filter applied
    }
  
    
  
    return dateApplied >= filterdDate;
  };



export const columns: ColumnDef<Job>[] = [
    {
        accessorKey: "jobName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Job Name" />
        ),
    },
    {
        accessorKey: "company",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Company" />
        ),
    },
    {
        accessorKey: "workscoutId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Work Scout" />
        ),
    },
    {
        accessorKey: "category",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
    },
    {
        accessorKey: "appliedDate",
        header: ({ column }) => (
            <div>
              Applied Date
              <div>
                <input
                  type="date"
                  placeholder="Applied Date"
                  value={(column.getFilterValue() as [string | null, string | null])?.[0] ?? ''}
                  onChange={(e) =>
                    column.setFilterValue((old: [string | null, string | null]) => [
                      e.target.value || null,
                      old?.[1] || null,
                    ])
                  }
                />
                </div>
            </div>
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("appliedDate"));
            return date.toLocaleDateString(); // Optional: format date
        },
        filterFn:dateRangeFilterFn
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = row.original.status;
            const classname = {
                "bg-orange-400": status.toLocaleLowerCase() === "in_progress",
                "bg-red-600": status.toLocaleLowerCase() === "rejected",
                "bg-green-400": status.toLocaleLowerCase() === "submitted",
                "bg-primary900": status.toLocaleLowerCase() === "applied",

            }
            return (
                <div className="flex items-center justify-center gap-2">
                    <div className={cn("rounded-full w-2 h-2", classname)}></div>
                    <div className="text-sm">{status.toLocaleLowerCase().split("_").join(' ')}</div>
                </div>
               
            );
        },
    },
    {
        accessorKey: "bookmarked",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Bookmarked?" />
        ),
        cell: ({ row }) => {
            const bookmark = row.original.bookmarked;
       
            return (
               <div className="flex items-center justify-center ">{bookmark ? <Check className="text-green-400 font-bold w-4 h-4"/> : <X className="text-orange-400 w-4 h-4"/>}</div>
            );
        },
    },
    {
        id: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Action" className="w-[80px]" />
        ),
        cell: ({row}) => {
               
            return (
                <HandleBookMark bookmark={row.original.bookmarked} id={row.original.id}/>
            );
        },
    },
];

export function useBookmarkMutation(id: string, book:boolean) {
    return useMutation({
      mutationFn: async () => {
        const res = await bookmarkJob(book, id);
        return res;
      },
      onSuccess(data) {
        if (data.status === 200) {
          toast.success("Job bookmarked successfully!");
        } else {
          toast.warning("Something went wrong. Try again later!");
        }
      },
      onError() {
        toast.error("Service is down, please refresh your page or try again later");
      },
    });
  }

  



const HandleBookMark = ({ bookmark, id }: { bookmark: boolean; id:string }) => {
    const { mutate, isPending} = useBookmarkMutation(id, !bookmark);

    return (
        <div className="flex items-center gap-2">
            {/* Add your action buttons here */}
            <button className="text-blue-500 hover:cursor-pointer disabled:text-muted-foreground" disabled={isPending} onClick={()=>{
                return mutate()
            }}>{bookmark ? "un-bookmark": "Bookmark"}</button>
        </div>
    )

}
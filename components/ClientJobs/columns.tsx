import { ColumnDef, RowExpanding } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../globalcomponents/ColumnHeader";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";


export type Job = {
    id: string;
    title: string;
    workscoutId: string;
    company: string;
    category: string;
    dateApplied: string; // or Date, depending on your data
    status: string;
    bookmarked:boolean
};



export const columns: ColumnDef<Job>[] = [
    {
        accessorKey: "title",
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
        accessorKey: "dateApplied",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Applied Date" />
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("dateApplied"));
            return date.toLocaleDateString(); // Optional: format date
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = row.original.status;
            const classname = {
                "bg-orange-400": status.toLocaleLowerCase() === "in progress",
                "bg-red-600": status.toLocaleLowerCase() === "rejected",
                "bg-green-400": status.toLocaleLowerCase() === "submitted",
                "bg-primary900": status.toLocaleLowerCase() === "applied",

            }
            return (
                <Badge className={cn(classname)}>{status}</Badge>
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
               <div>{bookmark ? <Check/> : <X/>}</div>
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
                <HandleBookMark bookmark={row.original.bookmarked}/>
            );
        },
    },
];



const HandleBookMark = ({ bookmark }: { bookmark: boolean }) => {
    // const bookmarkmutation = useMutation({

    // })
    return (
        <div className="flex items-center gap-2">
            {/* Add your action buttons here */}
            <button className="text-blue-500">{bookmark ? "un-bookmark": "Bookmark"}</button>
        </div>
    )

}
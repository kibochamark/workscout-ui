import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../globalcomponents/ColumnHeader";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export type Job = {
    id: string;
    title: string;
    workscoutId: string;
    company:string;
    category: string;
    dateApplied:string; // or Date, depending on your data
    status: string;
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
            const classname={
                "bg-orange-400" : status.toLocaleLowerCase() === "in progress",
                "bg-red-600" : status.toLocaleLowerCase() === "rejected",
                "bg-green-400" : status.toLocaleLowerCase() === "submitted",
                "bg-primary900" : status.toLocaleLowerCase() === "applied",

            }
            return (
                <Badge className={cn(classname)}>{status}</Badge>
            );
        },
    },
    {
        id: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Action" className="w-[80px]" />
        ),
        cell: () => {
          
            return (
                <div className="flex items-center gap-2">
                    {/* Add your action buttons here */}
                    <button className="text-blue-500">Bookmark</button>
                </div>
            );
        },
    },
];

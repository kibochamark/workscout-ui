import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../globalcomponents/ColumnHeader";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export type Job = {
    id: number;
    title: string;
    workscoutId: string;
    category: string;
    appliedDate: string; // or Date, depending on your data
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
            <DataTableColumnHeader column={column} title="Applied Date" />
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("appliedDate"));
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
                "bg-orange-400" : status === "in progress",
                "bg-red-600" : status === "rejected",
                "bg-green-400" : status === "submitted",

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
        cell: ({ row }) => {
            const job = row.original;
            return (
                <div className="flex items-center gap-2">
                    {/* Add your action buttons here */}
                    <button className="text-blue-500">Edit</button>
                    <button className="text-red-500">Delete</button>
                </div>
            );
        },
    },
];

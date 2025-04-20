"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    getSortedRowModel,
    VisibilityState,

    useReactTable,
    getPaginationRowModel,
    SortingState,
    GlobalFilterTableState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import React from "react"
import { Input } from "../ui/input"
import { DataTableViewOptions } from "./VisibleToggle"
import { DataTablePagination } from "./Pagination"
// import { FilterX, X } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { useAppDispatch, useAppSelector } from "@/redux/store"
// import { toggleFilter } from "@/redux/Slices/DataTableFilter"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filters?: React.ReactNode
}

// interface JobApplication {
//     clientAccountId: string;
//     workscoutAccountId: string;
//     jobName: string;
//     company: string;
//     category: string;
//     status: string;
//     bookmarked: boolean;
//     appliedDate: string; // Assuming appliedDate is a string in ISO format
//     deadlineDate: string;
// }

// // 1. Create a custom filter function for date range
// const dateRangeFilterFn: FilterFn<JobApplication> = (row, columnId, value: [Date | null, Date | null]) => {
//     const dateApplied = new Date(row.getValue(columnId));
//     const [startDateString, endDateString] = value;

//     const startDate = startDateString ? new Date(startDateString) : null;
//     const endDate = endDateString ? new Date(endDateString) : null;


//     if (!startDate && !endDate) {
//         return true; // No filter applied
//     }

//     if (startDate && !endDate) {
//         return dateApplied >= startDate;
//     }

//     if (!startDate && endDate) {
//         return dateApplied <= endDate;
//     }

//     return dateApplied >= startDate && dateApplied <= endDate;
// };

export function DataTable<TData, TValue>({
    columns,
    data,
   
}: DataTableProps<TData, TValue>) {


    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [globalFilterState, setGlobalFilter] = React.useState<GlobalFilterTableState>(

    )

    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})


    const [rowSelection, setRowSelection] = React.useState({})


    // custom states to handle custom filters
    // const isopen = useAppSelector((state) => state.datatable.filterOn)
    // const dispatch = useAppDispatch()
    // const className = {
    //     "hidden": isopen == false,
    //     "flex" :isopen == true
    // }


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        enableGlobalFilter: true,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter: globalFilterState
        },

    })

    return (
        <>
            <div className="grid grid-cols-2 gap-2  py-4">
                <div className="flex gap-2 flex-col">
                    <Input
                        placeholder="Filter data by column"
                        value={table.getState().globalFilter ?? ''}
                        onChange={(e) => table.setGlobalFilter(e.target.value)}
                        className="max-w-sm"
                    />

                    {/* <div className="flex justify-start items-start gap-2">
                        {isopen ? (
                            <X className="w-6 h-6 cursor-pointer text-primary900 font-semibold" onClick={() => {
                                dispatch(toggleFilter())
                            }} />
                        ) : (
                            <FilterX className="w-6 h-6 cursor-pointer text-primary900 font-semibold" onClick={() => {
                                dispatch(toggleFilter())
                            }} />
                        )}

                        <div className={cn("transition-all duration-100", className )}>
                            {filters}
                        </div>
                    </div> */}
                </div>

                <DataTableViewOptions table={table} />


            </div>
            <div className="rounded-md border">

                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <div className="py-2">

                    {/* pagination */}
                    <DataTablePagination table={table} />
                </div>

            </div>
        </>

    )
}

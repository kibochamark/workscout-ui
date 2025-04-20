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

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filters?:React.ReactNode
}

export function DataTable<TData, TValue>({
    columns,
    data,
    filters
}: DataTableProps<TData, TValue>) {


    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})


    const [rowSelection, setRowSelection] = React.useState({})


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
        onSortingChange:setSorting,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },

    })

    return (
        <>
            <div className="grid grid-cols-2 gap-2  py-4">
                <Input
                    placeholder="Filter data by column"
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DataTableViewOptions table={table} />

                <div className="space-y-2 my-4">
                    {/* <p className="text-muted-foreground">Other filters</p> */}
                    {filters}
                </div>
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

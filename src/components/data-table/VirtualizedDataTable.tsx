"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { TableVirtuoso } from "react-virtuoso";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  height: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  height,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();

  return (
    <div className="rounded-md border">
      <TableVirtuoso
        style={{ height }}
        totalCount={rows.length}
        components={{
          Table: ({ style, ...props }) => {
            return (
              <Table
                style={{
                  width: "100%",
                  tableLayout: "fixed",
                  borderCollapse: "collapse",
                  borderSpacing: 0,
                  ...style,
                }}
                {...props}
              />
            );
          },
          TableRow: (props) => {
            const index = props["data-index"];
            const row = rows[index];

            return (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                {...props}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          },
        }}
        fixedHeaderContent={() =>
          table.getHeaderGroups().map((headerGroup) => (
            // Change header background color to non-transparent
            <TableRow className="bg-card hover:bg-muted" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className="flex items-center"
                        {...{
                          style: header.column.getCanSort()
                            ? { cursor: "pointer", userSelect: "none" }
                            : {},
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {(() => {
                          const isSorted = header.column.getIsSorted();
                          if (isSorted === false) return null;
                          return (
                            <div>
                              {
                                {
                                  asc: "↑",
                                  desc: "↓",
                                }[isSorted]
                              }
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))
        }
      />
    </div>
  );
}

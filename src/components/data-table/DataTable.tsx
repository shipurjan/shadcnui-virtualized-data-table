"use client";

import {
  ColumnDef,
  OnChangeFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { TableVirtuoso } from "react-virtuoso";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
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
        totalCount={rows.length}
        components={{
          Table: ({ style, ...props }) => {
            return <Table style={style} {...props} />;
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
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : header.isPlaceholder ? null : (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                      <div
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
                          return {
                            asc: " 🔼",
                            desc: " 🔽",
                          }[isSorted];
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

//   <Table>
//     <TableHeader>
//       {table.getHeaderGroups().map((headerGroup) => (
//         <TableRow key={headerGroup.id}>
//           {headerGroup.headers.map((header) => {
//             return (
//               <TableHead key={header.id}>
//                 {header.isPlaceholder
//                   ? null
//                   : flexRender(
//                       header.column.columnDef.header,
//                       header.getContext(),
//                     )}
//               </TableHead>
//             );
//           })}
//         </TableRow>
//       ))}
//     </TableHeader>
//     <TableBody>
//       {table.getRowModel().rows?.length ? (
//         table.getRowModel().rows.map((row) => (
//           <TableRow
//             key={row.id}
//             data-state={row.getIsSelected() && "selected"}
//           >
//             {row.getVisibleCells().map((cell) => (
//               <TableCell key={cell.id}>
//                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
//               </TableCell>
//             ))}
//           </TableRow>
//         ))
//       ) : (
//         <TableRow>
//           <TableCell colSpan={columns.length} className="h-24 text-center">
//             No results.
//           </TableCell>
//         </TableRow>
//       )}
//     </TableBody>
//   </Table>

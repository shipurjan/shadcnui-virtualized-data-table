"use client";

import { Person } from "@/lib/makeData";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "firstName",
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.lastName,
    id: "lastName",
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
  },
  {
    accessorKey: "age",
    header: () => "Age",
    size: 50,
  },
  {
    accessorKey: "visits",
    header: () => <span>Visits</span>,
    size: 50,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "progress",
    header: "Profile Progress",
    size: 80,
  },
];

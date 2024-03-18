"use client";

import { useState } from "react";
import { DataTable } from "../data-table/DataTable";
import { columns } from "../data-table/columns";
import { makeData, newPerson } from "@/lib/makeData";

export type ShadcnDemoProps = React.HTMLAttributes<HTMLDivElement>;
const ShadcnDemo = ({ ...props }: ShadcnDemoProps) => {
  const [data, setData] = useState(() => makeData(2_000));

  return (
    <div>
      <div>
        <div>{data.length} Rows</div>
        <button
          onClick={() => {
            setData((prev) => [newPerson(prev[0].id - 2), ...prev]);
          }}
        >
          Add to beginning
        </button>
        <button
          onClick={() => {
            setData((prev) => prev.slice(1));
          }}
        >
          Delete first
        </button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ShadcnDemo;

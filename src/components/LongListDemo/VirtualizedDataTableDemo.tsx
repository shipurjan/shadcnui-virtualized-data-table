"use client";

import { useState } from "react";
import { DataTable } from "../data-table/VirtualizedDataTable";
import { columns } from "../data-table/columns";
import { makeData, newPerson } from "@/lib/makeData";

const VirtualizedDataTableDemo = () => {
  const [data, setData] = useState(() => makeData(3_000));

  return (
    <div>
      <DataTable columns={columns} data={data} height="500px" />

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
    </div>
  );
};

export default VirtualizedDataTableDemo;

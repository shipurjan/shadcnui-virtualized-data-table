"use client";

import { useState } from "react";
import { DataTable } from "../data-table/UnvirtualizedDataTable";
import { columns } from "../data-table/columns";
import { makeData, newPerson } from "@/lib/makeData";

const UnvirtualizedDataTableDemo = () => {
  const [data, setData] = useState(() => makeData(3_000));

  return (
    <div>
      <div
        style={{
          height: "500px",
          overflowY: "scroll"
        }}
      >
        <DataTable columns={columns} data={data} />
      </div>

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

export default UnvirtualizedDataTableDemo;

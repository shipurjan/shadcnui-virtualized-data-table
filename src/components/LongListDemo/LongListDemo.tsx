"use client";

import { faker } from "@faker-js/faker";
import { CSSProperties, useEffect, useLayoutEffect, useState } from "react";
import {
  List as ListVirtualized,
  ListRowRenderer as ListRowRendererVirtualized,
} from "react-virtualized";
import { FixedSizeList as ListWindow } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Person, makeData, newPerson } from "@/lib/makeData";

const INITIAL_ENTRIES = 500;

const data: Person[] = makeData(INITIAL_ENTRIES);

export type LongListDemoProps = React.HTMLAttributes<HTMLDivElement>;
const LongListDemo = ({ ...props }: LongListDemoProps) => {
  const [entries, setEntries] = useState<Person[]>(data);

  const row = ({
    index,
    key,
    style,
  }: {
    index: number;
    key: string;
    style: CSSProperties;
  }) => (
    <div>
      <div
        key={key}
        style={style}
        className="flex flex-col odd:bg-red-950 even:bg-sky-950"
      >
        <h3 className="font-bold leading-loose">
          {entries[index].firstName} {entries[index].lastName} -{" "}
          {entries[index].id}
        </h3>
        <p>{entries[index].status}</p>
      </div>
    </div>
  );
  
  return (
    <div
      {...props}
      className="flex divide-y-2 flex-col justify-center items-center"
    >
      <button
        onClick={() => {
          setEntries((prev) => [newPerson(prev[0].id - 2), ...prev]);
        }}
      >
        Add to beginning
      </button>
      <button
        onClick={() => {
          setEntries((prev) => prev.slice(1));
        }}
      >
        Delete first
      </button>
      react-virtualized
      <ListVirtualized
        width={500}
        height={400}
        rowRenderer={row}
        rowCount={entries.length}
        rowHeight={60}
      />
      react-window
      <ListWindow
        width={500}
        height={400}
        itemCount={entries.length}
        itemSize={60}
      >
        {/* @ts-expect-error lol */}
        {row}
      </ListWindow>
    </div>
  );
};

export default LongListDemo;

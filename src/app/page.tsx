import dynamic from "next/dynamic";
import { Suspense } from "react";

const VirtualizedDataTableDemo = dynamic(
  () => import("../components/LongListDemo/VirtualizedDataTableDemo"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

const UnvirtualizedDataTableDemo = dynamic(
  () => import("../components/LongListDemo/UnvirtualizedDataTableDemo"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

export default function Home() {
  return (
    <div className="w-full">
      <h1 className="text-xl font-bold">Virtualized shadcn data table (+ bonus sorting feature)</h1>
      <p>Adding new items is much faster, it still slows down with many thousands of items, but it`s still okay below 5000 items</p>
      <VirtualizedDataTableDemo />
      <div className="h-8"/>
      <h1 className="text-xl font-bold">Default/non-virtualized shadcn data table</h1>
      <p>Adding new items is very slow, already at 500 items or so</p>
      <UnvirtualizedDataTableDemo />
    </div>
  );
}

import dynamic from "next/dynamic";

const LongListDemo = dynamic(
  () => import("../components/LongListDemo/Virtuoso"),
  { ssr: false, loading: () => <p>Loading...</p> },
);

const ShadcnDemo = dynamic(() => import("../components/LongListDemo/Shadcn"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <div>
      <LongListDemo />
      <ShadcnDemo />
    </div>
  );
}

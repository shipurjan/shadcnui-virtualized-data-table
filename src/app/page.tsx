import dynamic from "next/dynamic";

const LongListDemo = dynamic(
  () => import("../components/LongListDemo/LongListDemo"),
  { ssr: false, loading: () => <p>Loading...</p>},
);

export default function Home() {
  return <LongListDemo />;
}

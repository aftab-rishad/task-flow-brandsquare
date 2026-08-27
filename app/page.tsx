import Header from "@/components/home/Header";
import OverviewCard from "@/components/home/OverviewCard";

export default function Home() {
  return (
    <div className="px-1 md:px-4 lg:px-6 mt-4">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-2 mt-10">
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
      </div>
    </div>
  );
}

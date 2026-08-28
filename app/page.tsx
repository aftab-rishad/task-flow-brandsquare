import ActiveProjects from "@/components/home/ActiveProjects";
import PageHeader from "@/components/common/PageHeader";
import OverviewCard from "@/components/home/OverviewCard";
import TasksDueSoon from "@/components/home/TasksDueSoon";
import {
  CircleCheckBig,
  FileWarning,
  FolderKanban,
  ListTodo,
} from "lucide-react";
import { parse } from "date-fns";
import { getTasks } from "@/actions/task";

export default async function Home() {
  const tasks = await getTasks();
  return (
    <div>
      <PageHeader
        title="Overview"
        description="Here's what's happening with your projects today."
        ctaText="Create Task"
        ctaLink="/tasks/new"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-2 mt-8">
        <OverviewCard title="Active Projects" icon={<FolderKanban size={20} />}>
          3
        </OverviewCard>
        <OverviewCard title="Total Tasks" icon={<ListTodo size={20} />}>
          {tasks.length}
        </OverviewCard>
        <OverviewCard
          variant="destructive"
          title="Overdue Tasks"
          icon={<FileWarning size={20} />}
        >
          {
            tasks.filter(
              (task) => parse(task.dueDate, "PPP", new Date()) < new Date(),
            ).length
          }
        </OverviewCard>
        <OverviewCard
          variant="success"
          title="Completed"
          icon={<CircleCheckBig size={20} />}
        >
          {tasks.filter((task) => task.status === "Done").length}
        </OverviewCard>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-5">
        <div className="md:col-span-3">
          <TasksDueSoon />
        </div>

        <div className="md:col-span-2">
          <ActiveProjects />
        </div>
      </div>
    </div>
  );
}

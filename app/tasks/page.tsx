import { getTasks } from "@/actions/task";
import PageHeader from "@/components/common/PageHeader";
import KanbanList from "@/components/tasks/KanbanList";

async function TaskPage() {
  const initialTasks = await getTasks();
  const toDoTasks = initialTasks.filter((task) => task.status === "Todo");
  const inProgressTasks = initialTasks.filter(
    (task) => task.status === "In Progress",
  );
  const doneTasks = initialTasks.filter((task) => task.status === "Done");
  return (
    <div>
      <PageHeader
        title="Tasks Board"
        description="Manage your tasks efficiently."
        ctaText="Create Task"
        ctaLink="/tasks/new"
      />
      <div className="w-full mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pb-4">
          <KanbanList title="To Do" tasks={toDoTasks} />
          <KanbanList title="In Progress" tasks={inProgressTasks} />
          <KanbanList title="Done" tasks={doneTasks} />
        </div>
      </div>
    </div>
  );
}

export default TaskPage;

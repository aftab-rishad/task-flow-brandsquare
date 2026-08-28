import { getTask } from "@/actions/task";
import TaskForm from "@/components/tasks/TaskForm";

export default async function CreateTaskEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const task = await getTask(id);
  console.log(task, "Task");

  return <TaskForm task={task ?? undefined} />;
}

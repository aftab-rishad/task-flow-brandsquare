import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

import { parse } from "date-fns";
import { getTasks } from "@/actions/task";

async function TasksDueSoon() {
  const initialTasks = await getTasks();

  const tasks = initialTasks.filter((task) => {
    const dueDate = parse(task.dueDate, "PPP", new Date());
    const today = new Date();
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);

    return dueDate >= today && dueDate <= sevenDaysFromNow;
  });
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Tasks Due Soon</CardTitle>
        <CardDescription>
          Unfinished tasks with deadlines approaching in the next 7 days.
        </CardDescription>
        <CardAction>
          <Button size="xs" render={<Link prefetch href="/tasks" />}>
            View All <ChevronRight />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Task Name</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length > 0 ? (
              tasks.map(
                (task, i) =>
                  i <= 4 && (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">
                        {task.title}
                      </TableCell>
                      <TableCell>{task.project}</TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            task.priority === "High"
                              ? "bg-red-950 text-red-300"
                              : task.priority === "Medium"
                                ? "bg-yellow-950 text-yellow-300"
                                : "bg-green-950 text-green-300",
                          )}
                        >
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {task.dueDate}
                      </TableCell>
                    </TableRow>
                  ),
              )
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold">No tasks found</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Create a new task to get started.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default TasksDueSoon;

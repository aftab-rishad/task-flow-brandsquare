import {
  MoreHorizontal,
  CalendarDays,
  FolderKanban,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/lib/common-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSubContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { deleteTask, updateTaskStatus } from "@/actions/task";

const priorityStyles = {
  Low: "bg-muted text-muted-foreground",
  Medium:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
  High: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
};

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="cursor-pointer gap-3 py-4 bg-primary/5">
      <CardContent className="px-4">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className={priorityStyles[task.priority]}>
            {task.priority}
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 shrink-0"
                />
              }
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                render={<Link prefetch href={`/tasks/${task.id}`} />}
                className="cursor-pointer"
              >
                Edit task
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="cursor-pointer">
                  Move to...
                </DropdownMenuSubTrigger>

                <DropdownMenuSubContent className="mx-1.5">
                  <DropdownMenuItem
                    onClick={async () => {
                      await updateTaskStatus(task.id, "Todo");
                    }}
                    className="cursor-pointer"
                  >
                    Todo
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={async () => {
                      await updateTaskStatus(task.id, "In Progress");
                    }}
                    className="cursor-pointer"
                  >
                    In Progress
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={async () => {
                      await updateTaskStatus(task.id, "Done");
                    }}
                    className="cursor-pointer"
                  >
                    Done
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={async () => {
                  await deleteTask(task.id);
                }}
                className="cursor-pointer text-destructive"
              >
                Delete task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h3 className="line-clamp-2 text-sm font-medium leading-5">
          {task.title}
        </h3>

        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="size-3.5" />
          {task.assignee}
        </p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <FolderKanban className="size-3.5" />
          {task.project}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {task.dueDate && (
              <span className="flex items-center gap-1">
                <CalendarDays className="size-3.5" />
                {task.dueDate}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

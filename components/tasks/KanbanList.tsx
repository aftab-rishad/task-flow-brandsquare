"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import TaskCard from "./TaskCard";

import { Task } from "@/lib/common-data";

export default function KanbanList({
  tasks,
  title,
}: {
  tasks: Task[];
  title: string;
}) {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedAssignee, setSelectedAssignee] = useState<string[]>([]);

  const projects = [...new Set(tasks.map((task) => task.project))];
  const assignees = [...new Set(tasks.map((task) => task.assignee))];

  const filteredTasks = tasks.filter(
    (task) =>
      (!selectedProjects.length || selectedProjects.includes(task.project)) &&
      (!selectedAssignee.length || selectedAssignee.includes(task.assignee)),
  );

  return (
    <div className="flex w-full shrink-0 flex-col">
      <div className="flex items-center justify-between rounded-t-xl border-b border-primary/20 bg-primary/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">{title}</h2>

          <Badge variant="default">{filteredTasks.length} Tasks</Badge>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="icon" className="size-7">
                <Filter className="size-3" />
              </Button>
            }
          ></DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Filter tasks</DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-2 py-1.5 text-xs font-normal text-muted-foreground">
                Project
              </DropdownMenuLabel>

              {projects.map((item) => (
                <DropdownMenuCheckboxItem
                  key={item}
                  checked={selectedProjects.includes(item)}
                  onCheckedChange={(checked) =>
                    setSelectedProjects((prev) =>
                      checked
                        ? [...prev, item]
                        : prev.filter((project) => project !== item),
                    )
                  }
                >
                  {item}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-2 py-1.5 text-xs font-normal text-muted-foreground">
                Assignee
              </DropdownMenuLabel>

              {assignees.map((item) => (
                <DropdownMenuCheckboxItem
                  key={item}
                  checked={selectedAssignee.includes(item)}
                  onCheckedChange={(checked) =>
                    setSelectedAssignee((prev) =>
                      checked
                        ? [...prev, item]
                        : prev.filter((assignee) => assignee !== item),
                    )
                  }
                >
                  {item}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex min-h-32 flex-col gap-3 rounded-b-xl bg-muted/40 px-2 py-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="flex h-full px-2 flex-col items-center justify-center text-center">
            <h2 className="font-semibold tracking-tight">No tasks found</h2>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              You don’t have any tasks here yet. Create a task to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

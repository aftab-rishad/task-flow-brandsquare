"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays, Plus } from "lucide-react";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Task } from "@/lib/common-data";
import { createTask, updateTask } from "@/actions/task";

export default function TaskForm({ task }: { task?: Task }) {
  const [date, setDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() + 7)),
  );
  const [formData, setFormData] = useState<Task>(
    task ?? {
      id: crypto.randomUUID(),
      title: "",
      project: "Website Redesign",
      priority: "Low",
      dueDate: date ? format(date, "PPP") : format(new Date(), "PPP"),
      assignee: "Khaled Farhad",
      status: "Todo",
      createdAt: format(new Date(), "PPP"),
    },
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate || new Date());

    setFormData((prevData) => ({
      ...prevData,
      dueDate: format(selectedDate || new Date(), "PPP"),
    }));
  };

  return (
    <div className="min-h-full">
      <div className="mx-auto w-full max-w-4xl p-4">
        <div className="mb-8">
          <Button
            render={
              <Link href="/tasks">
                <ArrowLeft className="mr-2 size-4" />
                Back to tasks
              </Link>
            }
            variant="ghost"
            size="sm"
            className="-ml-2 mb-4"
          ></Button>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Create task
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Create a task and assign it to a project and team member.
            </p>
          </div>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (task) {
              await updateTask(formData.id, formData);
            } else {
              await createTask(formData);
            }
            setFormData({
              id: crypto.randomUUID(),
              title: "",
              project: "Website Redesign",
              priority: "Low",
              dueDate: date ? format(date, "PPP") : format(new Date(), "PPP"),
              assignee: "Khaled Farhad",
              status: "Todo",
              createdAt: format(new Date(), "PPP"),
            });
          }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Task details</CardTitle>
              <CardDescription>
                Add the basic information for your task.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Task title</Label>

                <Input
                  required
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Review homepage design"
                />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Project</Label>

                  <Select
                    value={formData.project}
                    onValueChange={(value) =>
                      handleSelectChange("project", value ?? "")
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Website Redesign">
                        Website Redesign
                      </SelectItem>
                      <SelectItem value="Mobile App">Mobile App</SelectItem>
                      <SelectItem value="Marketing Campaign">
                        Marketing Campaign
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Assignee</Label>

                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("assignee", value ?? "")
                    }
                    value={formData.assignee}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Khaled Farhad">
                        Khaled Farhad
                      </SelectItem>
                      <SelectItem value="Sadia Rahman">Sadia Rahman</SelectItem>
                      <SelectItem value="Khaled Shariar">
                        Khaled Shariar
                      </SelectItem>
                      <SelectItem value="Shantonu Debnath">
                        Shantonu Debnath
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>

                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value ?? "")
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Todo">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value="Low"
                    onValueChange={(value) =>
                      handleSelectChange("priority", value ?? "")
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="due-date">Due date</Label>

                  <div className="relative">
                    <Popover>
                      <PopoverTrigger
                        render={
                          <Button
                            variant={"outline"}
                            data-empty={!date}
                            className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground w-full"
                          >
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarDays data-icon="inline-end" />
                          </Button>
                        }
                      />
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateChange}
                          defaultMonth={date}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button render={<Link href="/tasks" />} variant="outline">
              Cancel
            </Button>

            <Button type="submit">
              <Plus className="mr-2 size-4" />
              {task ? "Update Task" : "Create Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { LayoutDashboard, ListTodo, SavePlus } from "lucide-react";

export const icons = {
  LayoutDashboard: LayoutDashboard,
  ListTodo: ListTodo,
  SavePlus: SavePlus,
};

export interface SidebarItem {
  id: number;
  name: string;
  href: string;
  icon: IconName;
}

type IconName = keyof typeof icons;

export const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    name: "Dashboard",
    href: "/",
    icon: "LayoutDashboard",
  },
  {
    id: 3,
    name: "Task Board",
    href: "/tasks",
    icon: "ListTodo",
  },
  {
    id: 4,
    name: "Create Task",
    href: "/tasks/new",
    icon: "SavePlus",
  },
];

export type TaskStatus = "Todo" | "In Progress" | "Done";

export type Task = {
  id: string;
  title: string;
  project: string;
  assignee: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: TaskStatus;
  createdAt: string;
};

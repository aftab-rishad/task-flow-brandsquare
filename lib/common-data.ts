import {
  LayoutDashboard,
  ListTodo,
  SavePlus,
  FolderKanban,
} from "lucide-react";

export const icons = {
  LayoutDashboard: LayoutDashboard,
  FolderKanban: FolderKanban,
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
    id: 2,
    name: "Projects",
    href: "/projects",
    icon: "FolderKanban",
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

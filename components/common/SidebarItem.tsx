"use client";

import Link from "next/link";
import { SidebarItem, icons } from "@/lib/common-data";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

function AppSidebarItem({ item }: { item: SidebarItem }) {
  const pathname = usePathname();

  const Icon = icons[item.icon];

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={pathname === item.href}
        tooltip={item.name}
        render={<Link prefetch href={item.href} />}
        className="h-10 rounded-lg"
      >
        <Icon className="size-4 shrink-0" />
        <span>{item.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default AppSidebarItem;

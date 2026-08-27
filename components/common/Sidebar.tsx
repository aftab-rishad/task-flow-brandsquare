import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarItems } from "@/lib/common-data";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import AppSidebarFooter from "./SidebarFooter";

function AppSidebar() {
  return (
    <Sidebar className="border-background">
      <SidebarHeader className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link prefetch href="/" />}
              className="h-12 rounded-xl"
            >
              <Image
                alt="logo"
                src="/Brandsquare_Limited_Logo.png"
                width={1200}
                height={1200}
                className="size-8 shrink-0 object-contain group-data-[collapsible=icon]:size-9"
              />

              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-lg font-semibold text-primary">
                  Task Flow
                </span>

                <span className="text-[11px] text-muted-foreground">
                  Brandsquare Agency
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarMenu className="gap-1">
          {sidebarItems.map((item) => (
            <SidebarItem item={item} key={item.id} />
          ))}
        </SidebarMenu>
      </SidebarContent>

      <AppSidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;

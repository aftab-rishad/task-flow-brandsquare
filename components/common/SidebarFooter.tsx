import { ArchiveIcon } from "lucide-react";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
function AppSidebarFooter() {
  return (
    <SidebarFooter className="p-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="overflow-hidden rounded-xl border bg-accent/50">
            <SidebarMenuButton
              tooltip="Archive"
              className="h-10 rounded-none px-3"
            >
              <ArchiveIcon className="size-4 shrink-0" />
              <span>Archive</span>
            </SidebarMenuButton>

            <div className="flex items-center gap-2 border-t bg-primary/5 px-3 py-2.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                BA
              </div>

              <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                <p className="truncate text-sm font-medium leading-tight">
                  Brandsquare Agency
                </p>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                  Workspace
                </p>
              </div>
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

export default AppSidebarFooter;

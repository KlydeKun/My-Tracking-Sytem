import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/themes";
import { BugIcon } from "lucide-react";

const SideBar = ({
  menuItems,
}: {
  menuItems: { title: string; url: string; icon: React.ComponentType }[];
}) => {
  return (
    <Sidebar>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-base mt-2 flex gap-2 items-center text-black">
            <BugIcon />
            Issue Tracking System
          </SidebarGroupLabel>
          <Separator my="3" size="4" />
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} style={{ height: "2.5rem" }}>
                      <item.icon />
                      <span className="font-medium text-base">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;

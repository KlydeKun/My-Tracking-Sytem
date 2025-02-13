"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/themes";
import {
  BugIcon,
  ChevronUp,
  ClipboardList,
  LayoutDashboard,
  User,
  User2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const iconMap = {
  LayoutDashboard,
  ClipboardList,
  User,
};

const SideBar = ({
  menuItems,
}: {
  menuItems: { title: string; url: string; iconName: keyof typeof iconMap }[];
}) => {
  const { status, data: session } = useSession();

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
              {menuItems.map((item) => {
                const IconComponent = iconMap[item.iconName];
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} style={{ height: "2.5rem" }}>
                        <IconComponent />
                        <span className="font-medium text-base">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {session?.user?.name ?? "User"}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem asChild>
                  {status === "unauthenticated" ? (
                    <Link href="/api/auth/signin">Sign In</Link>
                  ) : (
                    <Link href="/api/auth/signout">Sign out</Link>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;

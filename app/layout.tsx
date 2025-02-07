import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Flex, Theme } from "@radix-ui/themes";
import SideBar from "./SideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BreadcrumbBar } from "./BreadCrumbBar";
import { LayoutDashboard, ClipboardList, User } from "lucide-react";

const getRoboto = Roboto({
  weight: "400",
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Issues",
      url: "/issues",
      icon: ClipboardList,
    },
    {
      title: "Users",
      url: "/users",
      icon: User,
    },
  ];

  return (
    <html lang="en">
      <body className={`${getRoboto.className} antialiased`}>
        <Theme appearance="light" accentColor="violet">
          <SidebarProvider>
            <SideBar menuItems={menuItems} />
            <main className="p-5 w-full space-y-5">
              <Flex gap="3" align="center">
                <SidebarTrigger />
                <BreadcrumbBar />
              </Flex>
              {children}
            </main>
          </SidebarProvider>
        </Theme>
      </body>
    </html>
  );
}

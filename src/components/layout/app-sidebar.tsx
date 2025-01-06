"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { BookDashed, HeartHandshake, Link, WalletCards } from "lucide-react";
import { NavMain } from "@/components/nav/nav-main";
import NavFooter from "@/components/nav/nav-footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/models/schemas/User";
import { Session } from "next-auth";

const data = {
  title: "Platform",
  url: "#",
  items: [
    {
      title: "Budgets",
      url: "/me/budgets",
      icon: WalletCards,
    },
    {
      title: "Contributions",
      url: "/me/contributions",
      icon: HeartHandshake,
    },
    {
      title: "Templates",
      url: "/me/templates",
      icon: BookDashed,
    },
  ],
};

export function AppSidebar({
  session,
  ...props
}: React.ComponentProps<typeof Sidebar> & { session: Session }) {
  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-row items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={(session.user?.image as string) || ""} />
              <AvatarFallback>
                {session.user?.name?.charAt(0) ?? ""}
              </AvatarFallback>
            </Avatar>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
              {session.user?.name}
            </SidebarGroupLabel>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <NavMain items={data.items} />
      </SidebarContent>
      <NavFooter />
    </Sidebar>
  );
}

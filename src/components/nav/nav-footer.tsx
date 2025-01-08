"use client";

import {
  SidebarFooter,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { signOutUser } from "@/services/auth.services";
import { LogOut, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const NavFooter = () => {
  const { theme, setTheme } = useTheme();

  return (
    <SidebarFooter className="mt-auto">
      <SidebarSeparator />

      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={"Change theme"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <SunIcon className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
              <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
              Change Theme
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={"Sign Out"}
              onClick={async () => {
                await signOutUser();
              }}
            >
              <LogOut />
              Sign Out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarFooter>
  );
};

export default NavFooter;

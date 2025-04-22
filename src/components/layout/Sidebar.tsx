import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const createNavItem = (
    label: string,
    icon: React.ReactNode,
    isActive: boolean,
    href: string,
    onClick: () => void
  ) => (
    <NavigationMenuItem key={label} className="w-full flex-start text-left">
      <NavigationMenuLink
        href={href}
        data-active={isActive}
        onClick={onClick}
        className={cn(
          "flex flex-row items-center gap-3 text-sm font-medium w-full p-2 rounded-md transition-all",
          isActive
            ? "text-[#1a237e] font-semibold bg-accent/50"
            : "text-gray-600 hover:text-[#1a237e] hover:bg-gray-100"
        )}
      >
        <span className={isActive ? "text-[#1a237e]" : "text-gray-500"}>
          {icon}
        </span>
        {!collapsed && label}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );

  return (
    <aside
      className={cn(
        "h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 dark:bg-gray-900 dark:border-gray-700",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div
        className={cn(
          "flex items-center p-4",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        {!collapsed && (
          <h1 className="text-2xl font-bold text-[#1a237e]">BatchCast</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                collapsed
                  ? "M13 5l7 7-7 7M5 5l7 7-7 7"
                  : "M11 19l-7-7 7-7M19 19l-7-7 7-7"
              }
            />
          </svg>
        </button>
      </div>

      <nav className="flex-1">
        <NavigationMenu
          orientation="vertical"
          className="w-full"
          viewport={false}
        >
          <NavigationMenuList
            className={cn(
              "flex-col space-y-1 w-full",
              collapsed ? "items-center px-2" : "px-4"
            )}
          >
            {createNavItem(
              "Dashboard",
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>,
              true,
              "#",
              () => console.log("Dashboard clicked")
            )}

            {createNavItem(
              "Upload",
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>,
              false,
              "#",
              () => console.log("Upload clicked")
            )}

            {createNavItem(
              "Scheduled",
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>,
              false,
              "#",
              () => console.log("Scheduled clicked")
            )}

            {createNavItem(
              "Integrations",
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>,
              false,
              "#",
              () => console.log("Integrations clicked")
            )}

            {createNavItem(
              "Analytics",
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>,
              false,
              "#",
              () => console.log("Analytics clicked")
            )}

            {createNavItem(
              "Settings",
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>,
              false,
              "#",
              () => console.log("Settings clicked")
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </aside>
  );
};

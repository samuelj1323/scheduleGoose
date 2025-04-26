import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobile,
  onCloseMobile,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Close sidebar on mobile when clicking a link
  const handleNavClick = () => {
    if (isMobile && onCloseMobile) {
      onCloseMobile();
    }
  };

  const createNavItem = (
    label: string,
    icon: React.ReactNode,
    href: string
  ) => {
    const isActive = location.pathname === href;

    return (
      <NavigationMenuItem
        key={label}
        className="w-full bg-background dark:bg-sidebar"
      >
        <NavigationMenuLink
          href={href}
          data-active={isActive}
          onClick={handleNavClick}
          className={cn(
            "flex bg-sidebar dark:bg-sidebar flex-row items-center justify-center text-sm font-medium w-full py-4 transition-all",
            collapsed && !isMobile && "px-0",
            !collapsed && !isMobile && "justify-start px-4",
            isMobile && "justify-start px-4",
            isActive
              ? "text-[#1a237e] font-semibold bg-accent/50 dark:text-blue-300 "
              : "text-gray-600 hover:text-[#1a237e] hover:bg-gray-100 dark:text-white dark:hover:text-white dark:hover:bg-gray-800"
          )}
        >
          <div className="w-10 h-10 flex items-center justify-center">
            <span
              className={
                isActive
                  ? "text-[#1a237e] dark:text-blue-300"
                  : "text-gray-500 dark:text-white"
              }
            >
              {icon}
            </span>
          </div>
          {(!collapsed || isMobile) && <span className="ml-3">{label}</span>}
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  return (
    <aside
      className={cn(
        " border-r bg-sidebar dark:bg-sidebar h-screen border-gray-200 flex flex-col transition-all duration-300  dark:border-gray-700",
        isMobile
          ? "w-full h-screen fixed top-0 left-0 z-50"
          : collapsed
          ? "w-[70px] min-h-vh"
          : "w-[250px] min-h-vh"
      )}
    >
      <div
        className={cn(
          "flex items-center p-4 bg-sidebar dark:bg-sidebar text-sidebar-foreground dark:text-sidebar-foreground",
          collapsed && !isMobile ? "justify-center" : "justify-between"
        )}
      >
        {(!collapsed || isMobile) && (
          <h1 className="text-2xl font-bold ">ScheduleGoose</h1>
        )}
        <div className="w-10 h-10 flex items-center justify-center">
          {/* Show close button on mobile, collapse button on desktop */}
          {isMobile ? (
            <button
              onClick={onCloseMobile}
              className="w-full h-10 flex items-center justify-center rounded-full hover:bg-gray-100  dark:hover:bg-gray-800"
              aria-label="Close sidebar"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={toggleSidebar}
              className="w-full h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
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
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <NavigationMenu
          orientation="vertical"
          className="w-full h-full flex-1 bg-background"
          viewport={false}
        >
          <div className="w-full">
            <NavigationMenuList className="flex-col w-full h-full items-stretch space-y-0 bg-background">
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
                "/"
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
                "/upload"
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
                "/scheduled"
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
                "/integrations"
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
                "/analytics"
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
                "/settings"
              )}
            </NavigationMenuList>
          </div>
        </NavigationMenu>
      </div>
    </aside>
  );
};

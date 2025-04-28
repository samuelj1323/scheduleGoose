import React, { ReactNode, useState, useEffect } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [navBarOpen, setNavBarOpen] = useState(false);

  // Check if screen is mobile size on initial load and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setNavBarOpen(!navBarOpen);
  };

  // Set initial dark mode on mount

  return (
    <div className="min-h-screen bg-samRed text-textColor flex relative">
      {/* Mobile Menu Button - only shows on mobile */}
      {isMobile && !navBarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md  "
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Sidebar - hidden on mobile unless toggled */}
      <div
        className={`${isMobile ? "fixed z-40 h-full" : ""} ${
          isMobile && !navBarOpen ? "hidden" : "block"
        }`}
      >
        <Navbar
          onCloseMobile={isMobile ? toggleSidebar : undefined}
          isMobile={isMobile}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className={`p-6 ${isMobile ? "pt-16" : ""}`}>{children}</div>
      </main>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && navBarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

import React, { ReactNode } from "react";

interface NavItemProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  href: string;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  isActive,
  href,
  onClick,
}) => {
  return (
    <li
      className="w-full p-4 hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <a
        href={href}
        className={`flex items-center px-3 py-2 text-sm font-medium mx-4 p-3 rounded-md ${
          isActive
            ? "text-[#1a237e] font-semibold"
            : "text-gray-600 hover:text-[#1a237e]"
        }`}
      >
        <span
          className={`mr-3 ${isActive ? "text-[#1a237e]" : "text-gray-500"}`}
        >
          {icon}
        </span>
        {label}
      </a>
    </li>
  );
};

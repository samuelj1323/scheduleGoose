import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

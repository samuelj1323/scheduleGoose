import React, { ReactNode } from "react";

interface ContentItemProps {
  type: "video" | "blog" | "audio";
  title: string;
  className?: string;
}

export const ContentItem: React.FC<ContentItemProps> = ({
  type,
  title,
  className = "",
}) => {
  const iconMap: Record<string, ReactNode> = {
    video: (
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
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
    blog: (
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
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
    ),
    audio: (
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
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>
    ),
  };

  const typeText = {
    video: "Video",
    blog: "Blog Post",
    audio: "Audio",
  };

  return (
    <div
      className={`py-3 border-b border-gray-100 dark:border-b dark:border-white flex items-center justify-between ${className} last:border-b-0`}
    >
      <div className="flex items-center">
        <div className="w-6 h-6 flex items-center justify-center text-gray-600 dark:text-gray-400 mr-3">
          {iconMap[type]}
        </div>
        <div>
          <div className="font-medium text-gray-800 dark:text-gray-200">
            {typeText[type]}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};

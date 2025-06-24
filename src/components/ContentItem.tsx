import { Post } from "@/pages/Dashboard/ScheduledContent";
import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/Card";

export const ContentItem: React.FC<Post> = ({
  postName,
  description,
  file,
  publishDate,
  platform,
  status,
}) => {
  const formatDateTime = (date: Date | string) => {
    const dateObj = new Date(date);
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    return `${month}/${day}/${year} ${hours}:${minutes}`;
  };

  const getImageSrc = () => {
    if (!file) return null;

    // Handle different file formats
    if (typeof file === "string") {
      // If file is already a base64 string or URL
      return file.startsWith("data:") || file.startsWith("http")
        ? file
        : `data:image/jpeg;base64,${file}`;
    }

    // Handle ArrayBuffer or Uint8Array
    if (file instanceof ArrayBuffer) {
      const uint8Array = new Uint8Array(file);
      const blob = new Blob([uint8Array]);
      return URL.createObjectURL(blob);
    }

    // Handle Uint8Array directly
    if (file instanceof Uint8Array) {
      const blob = new Blob([file]);
      return URL.createObjectURL(blob);
    }

    // Handle as generic object with data property (from database)
    if (
      typeof file === "object" &&
      file !== null &&
      "data" in file &&
      Array.isArray(file.data)
    ) {
      const uint8Array = new Uint8Array(file.data);
      const blob = new Blob([uint8Array]);
      return URL.createObjectURL(blob);
    }

    return null;
  };

  const platformIconMap: Record<string, ReactNode> = {
    video: (
      <svg
        className="w-4 h-4"
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
        className="w-4 h-4"
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
    instagram: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    twitter: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const imageSrc = getImageSrc();

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Image Section */}
          <div className="flex-shrink-0">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={postName}
                className="w-20 h-20 object-cover rounded-lg"
                onError={(e) => {
                  // Fallback to icon if image fails to load
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove(
                    "hidden"
                  );
                }}
              />
            ) : null}
            <div
              className={`w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center ${
                imageSrc ? "hidden" : ""
              }`}
            >
              {platformIconMap[platform.toLowerCase()] || platformIconMap.blog}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate">
                  {postName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {description}
                </p>
              </div>

              {/* Status Badge */}
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(
                  status
                )}`}
              >
                {status}
              </span>
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                {platformIconMap[platform.toLowerCase()] ||
                  platformIconMap.blog}
                <span className="capitalize">{platform}</span>
              </div>
              <div>Publish: {formatDateTime(publishDate)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

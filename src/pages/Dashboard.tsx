import React from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ContentItem } from "../components/dashboard/ContentItem";
import { ActivityChart } from "../components/dashboard/ActivityChart";
import { UploadsTable } from "../components/dashboard/UploadsTable";

// Define the Upload type to match UploadsTable expected type
interface Upload {
  id: string;
  content: string;
  type: "video" | "blog" | "audio";
  status: "published" | "scheduled" | "draft";
}

export const Dashboard: React.FC = () => {
  const recentUploads: Upload[] = [
    { id: "1", content: "Product Demo", type: "video", status: "published" },
    {
      id: "2",
      content: "Tips for Beginners",
      type: "blog",
      status: "published",
    },
    { id: "3", content: "Podcast Trailer", type: "audio", status: "scheduled" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#1a237e]">
          BatchCastDashboard
        </h1>
        <Button
          variant="primary"
          size="md"
          icon={
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          }
        >
          New Upload
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card title="Upload Activity">
          <ActivityChart />
        </Card>

        <Card title="Scheduled Content">
          <div className="space-y-3">
            <ContentItem type="video" title="YT Teaser" />
            <ContentItem type="blog" title="How to Batch Create" />
            <ContentItem type="audio" title="Ep: 12: Interview" />
          </div>
        </Card>
      </div>

      <Card title="Recent Uploads">
        <UploadsTable uploads={recentUploads} />
      </Card>

      <Card title="Recent Uploads" className="md:hidden">
        <div className="space-y-3">
          <div className="p-3 border-b border-gray-200">
            <div className="font-medium">Video</div>
          </div>
          <div className="p-3 border-b border-gray-200">
            <div className="font-medium">Blog Post</div>
          </div>
          <div className="p-3">
            <div className="font-medium">Audio</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

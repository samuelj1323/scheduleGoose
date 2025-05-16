import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ScheduledContent from "@/pages/Dashboard/ScheduledContent";
import { UploadSheet } from "@/components/dashboard/UploadSheet";
import { useAuth } from "@/lib/auth";
import { getContentData } from "@/lib/apiPromises";

export const Dashboard: React.FC = () => {
  const { token } = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["content"],
    queryFn: () => getContentData(token),
    refetchInterval: 60000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className=" dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold ">ScheduleGoose</h1>
        <UploadSheet
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
        />
      </div>

      <div className="  md:grid-cols-2 gap-6 mb-6">
        <ScheduledContent data={data} />
      </div>
    </div>
  );
};

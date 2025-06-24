import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ContentItem } from "@/components/ContentItem";

export interface Post {
  postId: number;
  userId: number;
  postName: string;
  description: string;
  file: string | ArrayBuffer | Uint8Array | { data: number[] } | null;
  publishDate: string | Date;
  createdDate: string | Date;
  platform: string;
  status: string;
}

interface ScheduledContentProps {
  data: { content: Post[] };
}

const ScheduledContent = ({ data }: ScheduledContentProps) => {
  const formatDateTime = (date: Date | string) => {
    const dateObj = new Date(date);
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");

    return `${month}/${day}/${year} ${hours}:${minutes}`;
  };

  return (
    <Card
      id="scheduled-content"
      className="w-full bg-background border-none shadow-none"
    >
      <CardHeader>
        <CardTitle>Scheduled Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!data?.content?.length && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              There is no scheduled content
            </p>
          )}
          {data?.content.map((item: Post) => (
            <div key={item.postId} className="flex items-start gap-6">
              <div className="flex-shrink-0 w-32">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {formatDateTime(item?.publishDate)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Created
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <ContentItem {...item} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduledContent;

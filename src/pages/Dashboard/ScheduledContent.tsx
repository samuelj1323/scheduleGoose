import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ContentItem } from "@/components/dashboard/ContentItem";

export interface Post {
  postId: number;
  userId: number;
  postName: string;
  description: string;
  file: Buffer | null;
  publishDate: string | Date;
  createdDate: string | Date;
  platform: string;
  status: string;
}

interface ScheduledContentProps {
  data: { content: Post[] };
}
const ScheduledContent = ({ data }: ScheduledContentProps) => {
  return (
    <Card id="scheduled-content" className="w-full">
      <CardHeader>
        <CardTitle>Scheduled Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {!data?.content?.length && "There is no scheduled content"}
          {data?.content.map((item: Post) => (
            <ContentItem key={item.postId} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduledContent;

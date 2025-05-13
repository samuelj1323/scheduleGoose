import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ContentItem } from "@/components/dashboard/ContentItem";
import { Upload } from "@/types/Upload";

interface ScheduledContentProps {
  data: { content: Upload[] };
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
          {data?.content.map((item: Upload) => (
            <ContentItem
              key={item.id}
              title={item.title || (item.content as string)}
              type={item.type}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduledContent;

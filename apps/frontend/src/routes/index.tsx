import { createFileRoute } from "@tanstack/react-router";
import ContentCarousel from "$lib/components/content-carousel/content-carousel";
import { IContentCard } from "$lib/types";
import styles from "./index.module.css";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const dummyData: IContentCard[] = [
    {
      type: "video",
      title: "Sample Video",
      subTitle: "Example of a video card",
      author: "John Doe",
      href: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail: "https://www.w3schools.com/html/pic_trulli.jpg",
      createdTime: new Date("2024-06-01T12:00:00Z"),
      scheduledTime: new Date("2024-06-05T09:00:00Z"),
    },
    {
      type: "audio",
      title: "Sample Audio",
      subTitle: "Example of an audio card",
      author: "Jane Smith",
      href: "https://www.w3schools.com/html/horse.mp3",
      thumbnail: "https://www.w3schools.com/html/img_girl.jpg",
      createdTime: new Date("2024-06-02T13:30:00Z"),
      scheduledTime: new Date("2024-06-05T14:30:00Z"),
    },
    {
      type: "image",
      title: "Sample Image",
      subTitle: "Example of an image card",
      author: "Bob Johnson",
      href: "https://www.w3schools.com/html/img_chania.jpg",
      createdTime: new Date("2024-06-03T15:00:00Z"),
      scheduledTime: new Date("2024-06-05T16:00:00Z"),
    },
    {
      type: "text",
      title: "Sample Text",
      subTitle: "Example of a text card",
      author: "Alice Williams",
      content: "This is a dummy text content for the text card example.",
      createdTime: new Date("2024-06-04T17:00:00Z"),
      scheduledTime: new Date("2024-06-06T08:00:00Z"),
    },
    {
      type: "video",
      title: "Another Video",
      subTitle: "Second video for same date",
      author: "John Doe",
      href: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail: "https://www.w3schools.com/html/pic_trulli.jpg",
      createdTime: new Date("2024-06-01T12:00:00Z"),
      scheduledTime: new Date("2024-06-06T10:00:00Z"),
    },
  ];
  return (
    <div className={styles.container}>
      <ContentCarousel scheduledContent={dummyData} />
    </div>
  );
}

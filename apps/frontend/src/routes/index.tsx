import { createFileRoute } from "@tanstack/react-router";
import ContentCarousel from "$lib/components/content-carousel/content-carousel";
import ContentCalendar from "$lib/components/content-calendar/content-calendar";
import { hc } from 'hono/client';
import type { AppType } from '@schedulegoose/backend';
import styles from "./index.module.css";

const client = hc<AppType>('http://localhost:8787');

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => {
    const response = await client.api.content.$get();
    if (!response.ok) {
      throw new Error('Failed to fetch content');
    }
    const data = await response.json();
    return data.map((item) => ({
      ...item,
      createdTime: new Date(item.createdTime),
      scheduledTime: new Date(item.scheduledTime)
    }));
  },
});

function Index() {
  const content = Route.useLoaderData();

  return (
    <div className={styles.container}>
      <ContentCarousel scheduledContent={content} />
      <ContentCalendar />
    </div>
  );
}

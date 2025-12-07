import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ContentCarousel from "$lib/components/content-carousel/content-carousel";
import ContentCalendar from "$lib/components/content-calendar/content-calendar";
import Schedule from "$lib/components/schedule/schedule";
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const filteredContent = content.filter((item) => {
    if (!selectedDate) return true; // Show all if no date selected
    const itemDate = item.scheduledTime.toISOString().split("T")[0];
    const filterDate = selectedDate.toISOString().split("T")[0];
    return itemDate === filterDate;
  });

  return (
    <div className={styles.container}>
      <Schedule selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <ContentCarousel scheduledContent={filteredContent} />
      <ContentCalendar />
    </div>
  );
}

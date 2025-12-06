import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ContentCarousel from "$lib/components/content-carousel/content-carousel";
import ContentCalendar from "$lib/components/content-calendar/content-calendar";
import { IContentCard } from "@schedulegoose/types";
import styles from "./index.module.css";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [content, setContent] = useState<IContentCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8787/api/content');
        if (!response.ok) {
            throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        // Need to convert date strings back to Date objects
        const parsedData = data.map((item: any) => ({
            ...item,
            createdTime: new Date(item.createdTime),
            scheduledTime: new Date(item.scheduledTime)
        }));
        setContent(parsedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className={styles.loading}>Loading content...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <ContentCarousel scheduledContent={content} />
      <ContentCalendar />
    </div>
  );
}

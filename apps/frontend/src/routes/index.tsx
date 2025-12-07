import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import ContentCarousel from "$lib/components/content-carousel/content-carousel";
import ContentCalendar from "$lib/components/content-calendar/content-calendar";
import Schedule from "$lib/components/schedule/schedule";
import { hc } from 'hono/client';
import type { AppType } from '@schedulegoose/backend';
import styles from "./index.module.css";
import { authClient } from "$lib/auth-client";

const client = hc<AppType>('/');

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();
    if (!session) {
      throw redirect({ to: "/login" });
    }
  },
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
  const [importing, setImporting] = useState(false);

  const filteredContent = content.filter((item) => {
    if (!selectedDate) return true; 
    const itemDate = item.scheduledTime.toISOString().split("T")[0];
    const filterDate = selectedDate.toISOString().split("T")[0];
    return itemDate === filterDate;
  });

  const handleImport = async () => {
      setImporting(true);
      try {
          const res = await client.api.import.youtube.$post();
          const data = await res.json();
          if (res.ok) {
            if ('imported' in data) {
                alert(`Successfully imported ${data.imported} videos!`);
                window.location.reload(); 
            } else {
                 alert("Import completed but no count returned.");
            }
          } else {
              alert("Failed to import: " + (data as any).error);
          }
      } catch (e) {
          console.error(e);
          alert("Error importing videos");
      } finally {
          setImporting(false);
      }
  };

  return (
    <div className={styles.container}>
      <div className={styles.dashboardHeader}>
        <div>
            <h1>Dashboard</h1>
            <p className={styles.welcomeText}>Here is what's happening with your schedule.</p>
        </div>
        <button 
            onClick={handleImport}
            disabled={importing}
            className={styles.importButton}
        >
            {importing ? 'Syncing...' : '🔄 Sync YouTube'}
        </button>
      </div>

      <Schedule selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <ContentCarousel scheduledContent={filteredContent} />
      <ContentCalendar />
    </div>
  );
}

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
  const session = authClient.useSession(); 

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
            // Check if success response
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
      <header style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>ScheduleGoose</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <a href="/posts" style={{ marginRight: 20, textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>All Posts & Tools</a>
             <button 
                onClick={handleImport}
                disabled={importing}
                style={{ marginRight: 20 }}
             >
                {importing ? 'Importing...' : 'Sync YouTube Videos'}
             </button>
             {session.data?.user.image && (
                 <img src={session.data.user.image} alt="Profile" style={{ width: 32, height: 32, borderRadius: '50%' }} />
             )}
            <span>{session.data?.user.name}</span>
            <button onClick={async () => {
              await authClient.signOut();
              window.location.href = "/login";
            }}>Sign Out</button>
        </div>
      </header>
      <div className={styles.container}>
        <Schedule selectedDate={selectedDate} onDateChange={setSelectedDate} />
        <ContentCarousel scheduledContent={filteredContent} />
        <ContentCalendar />
      </div>
    </div>
  );
}

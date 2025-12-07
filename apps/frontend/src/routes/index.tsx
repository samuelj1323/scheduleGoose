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
    // We need to pass credentials (cookies) for the API to recognize the session
    // Hono client (hono/client) uses fetch under the hood. 
    // We should configure the client to include credentials, or manually pass headers if using a different fetcher.
    // The default hc client might not include credentials automatically in all environments.
    // Let's ensure the backend CORS allows credentials (which we did).
    
    // Note: client.api.content.$get() is a wrapper around fetch.
    // We might need to recreate the client with headers if it doesn't support credentials by default,
    // but usually browsers handle cookies automatically for same-domain or properly CORS-configured cross-domain requests.
    
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
  const session = authClient.useSession(); // Hydrate session in UI if needed

  const filteredContent = content.filter((item) => {
    if (!selectedDate) return true; // Show all if no date selected
    const itemDate = item.scheduledTime.toISOString().split("T")[0];
    const filterDate = selectedDate.toISOString().split("T")[0];
    return itemDate === filterDate;
  });

  return (
    <div className={styles.container}>
      <header style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>ScheduleGoose</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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

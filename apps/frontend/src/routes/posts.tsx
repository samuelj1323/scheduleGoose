import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { hc } from 'hono/client';
import type { AppType } from '@schedulegoose/backend';
import { authClient } from "$lib/auth-client";
import ContentCard from "$lib/components/content-carousel/content-card";
import { useState } from "react";
import styles from "./posts.module.css";
import ThumbnailGenerator from "$lib/components/thumbnail-generator/thumbnail-generator";

const client = hc<AppType>('/');

export const Route = createFileRoute("/posts")({
  component: Posts,
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

function Posts() {
  const content = Route.useLoaderData();
  const session = authClient.useSession();
  const [filter, setFilter] = useState<'all' | 'video' | 'audio' | 'image' | 'text'>('all');

  const filteredContent = content.filter(item => {
      if (filter === 'all') return true;
      return item.type === filter;
  });

  return (
    <div className={styles.container}>
       <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <h2>All Posts</h2>
            <Link to="/" className={styles.backLink}>&larr; Back to Dashboard</Link>
        </div>
        <div className={styles.userInfo}>
            {session.data?.user.image && (
                <img src={session.data.user.image} alt="Profile" className={styles.userImage} />
            )}
            <span className={styles.userName}>{session.data?.user.name}</span>
        </div>
      </header>

      <div className={styles.controls}>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as any)}
            className={styles.filterSelect}
          >
              <option value="all">All Content Types</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
              <option value="image">Images</option>
              <option value="text">Text</option>
          </select>
          <div className={styles.count}>
              Found {filteredContent.length} posts
          </div>
      </div>

      <div className={styles.grid}>
          {filteredContent.map((item) => (
              <div key={item.id} style={{ height: 400 }}>
                <ContentCard {...item} />
              </div>
          ))}
      </div>

      <div className={styles.toolsSection}>
          <h3>Creative Tools</h3>
          <ThumbnailGenerator />
      </div>
    </div>
  );
}

import { Hono } from 'hono';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/index';
import { content, account } from '../db/schema';
import { auth } from '../auth';
import { fetchChannelVideos, fetchVideoAnalytics } from '../lib/youtube';

const importRoute = new Hono()
  .post('/youtube', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // 1. Get Google Access Token
    const [googleAccount] = await db.select()
      .from(account)
      .where(and(
        eq(account.userId, session.user.id),
        eq(account.providerId, 'google')
      ));

    if (!googleAccount || !googleAccount.accessToken) {
      return c.json({ error: 'Google account not linked or missing token' }, 400);
    }

    try {
      // 2. Fetch Videos from YouTube
      const videos = await fetchChannelVideos(googleAccount.accessToken);
      
      if (videos.length === 0) {
        return c.json({ message: 'No videos found', count: 0 });
      }

      // 3. Fetch detailed stats (view counts, etc)
      const videoIds = videos.map(v => v.contentDetails?.videoId).filter(Boolean) as string[];
      const videoStats = await fetchVideoAnalytics(googleAccount.accessToken, videoIds);

      // Create a map for easy lookup
      const statsMap = new Map(videoStats.map(v => [v.id, v]));

      let importedCount = 0;

      // 4. Save to DB
      for (const video of videos) {
        const videoId = video.contentDetails?.videoId;
        if (!videoId) continue;

        const stats = statsMap.get(videoId);
        const snippet = video.snippet;

        // Check if already exists (naive check by title for now, ideally we should store external ID)
        // Since we don't have external_id column yet, we'll skip or just insert new ones.
        // TODO: Add externalId to content schema for proper syncing.
        
        const metadata = {
            href: `https://www.youtube.com/watch?v=${videoId}`,
            thumbnail: snippet?.thumbnails?.high?.url || snippet?.thumbnails?.default?.url || '',
            subTitle: snippet?.description?.substring(0, 100) || '',
            views: stats?.statistics?.viewCount ? parseInt(stats.statistics.viewCount) : 0,
            likes: stats?.statistics?.likeCount ? parseInt(stats.statistics.likeCount) : 0,
            commentCount: stats?.statistics?.commentCount ? parseInt(stats.statistics.commentCount) : 0,
        };

        await db.insert(content).values({
            userId: session.user.id,
            title: snippet?.title || 'Untitled Video',
            type: 'video',
            status: 'published', // It's on YouTube, so it's published
            scheduledTime: new Date(snippet?.publishedAt || Date.now()),
            createdTime: new Date(snippet?.publishedAt || Date.now()),
            metadata: metadata as any, // Cast to any to bypass strict union check on insert
        });
        
        importedCount++;
      }

      return c.json({ 
        success: true, 
        imported: importedCount, 
        totalFound: videos.length 
      });

    } catch (error: any) {
      console.error('Import Error:', error);
      return c.json({ error: error.message || 'Failed to import videos' }, 500);
    }
  });

export { importRoute };

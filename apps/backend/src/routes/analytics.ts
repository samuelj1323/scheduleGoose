import { Hono } from 'hono';
import { calculateOutlierScore } from '../lib/analytics';
import { scoreContent } from '../lib/content-scorer';
import { db } from '../db/index';
import { content } from '../db/schema';
import { auth } from '../auth';
import { eq, and } from 'drizzle-orm';
import { ContentVideoCard } from '@schedulegoose/types';

const analytics = new Hono()
  .post('/predict', async (c) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  const body = await c.req.json();
  const { title, type } = body;

  if (!title) {
    return c.json({ error: 'Title is required' }, 400);
  }

  // 1. Fetch Real History
  let viewHistory: number[] = [];
  
  if (session?.user?.id) {
      const historyItems = await db.select({
          metadata: content.metadata
      })
      .from(content)
      .where(and(
          eq(content.userId, session.user.id),
          eq(content.type, 'video'),
          eq(content.status, 'published')
      ));

      viewHistory = historyItems
          .map(item => (item.metadata as unknown as ContentVideoCard).views || 0)
          .filter(v => v > 0);
  }

  // Fallback if no history
  if (viewHistory.length < 5) {
      viewHistory = [1200, 1500, 1100, 1300, 1250, 1400, 1600, 1150, 1350, 1450];
  }

  // 2. Score the content based on heuristics
  const contentScore = scoreContent(title, type);

  // 3. Predict views based on history average
  const sum = viewHistory.reduce((a, b) => a + b, 0);
  const avgViews = Math.floor(sum / viewHistory.length) || 1000;
  
  const predictedViews = Math.floor(avgViews * (contentScore.score / 50)); 

  // 4. Calculate Outlier Status
  const outlierAnalysis = calculateOutlierScore(viewHistory, predictedViews);

  return c.json({
    contentScore,
    predictedViews,
    outlierAnalysis,
    historySize: viewHistory.length
  });
});

export { analytics };

# Analytics & Insights: Detailed Specs

## Data Schemas

### `analytics_snapshot` Table
This table stores time-series data. Each row represents the state of a piece of content at a specific point in time (usually daily or hourly).

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `content_id` | UUID | FK to `content.id` |
| `timestamp` | TIMESTAMP | When this snapshot was taken |
| `metrics` | JSONB | Flexible storage for platform-specific metrics |

**Example `metrics` JSON for YouTube:**
```json
{
  "views": 1500,
  "likes": 120,
  "comments": 45,
  "shares": 10,
  "averageViewDuration": 145, // seconds
  "impressions": 12000,
  "clickThroughRate": 0.085, // 8.5%
  "subscribersGained": 5
}
```

**Example `metrics` JSON for Blog (GSC/GA):**
```json
{
  "pageviews": 500,
  "uniqueVisitors": 450,
  "averageTimeOnPage": 180, // seconds
  "bounceRate": 0.65, // 65%
  "organicSearchClicks": 120,
  "organicSearchImpressions": 2000
}
```

## Calculated Insights Logic

### 1. The Outlier Score (Z-Score)
To detect if a video is "viral" or "flopping", we compare it to the channel's baseline.
*   **Baseline:** Moving average of the last 10 videos (excluding the top 1 and bottom 1 to remove extreme outliers).
*   **Standard Deviation (σ):** Calculate volatility of the last 10 videos.
*   **Formula:** `(Current Views - Baseline Average) / σ`
*   **Interpretation:**
    *   `> +2.0`: **Viral Breakout** (Show 🔥 icon)
    *   `> +1.0`: **Overperformer** (Show 📈 icon)
    *   `-1.0 to +1.0`: **Average**
    *   `< -1.0`: **Underperformer** (Show 📉 icon)

### 2. Retention Hook Score
*   **Metric:** Retention at 0:30 timestamp.
*   **Goal:** > 65% for high performance.
*   **Insight:** If < 50%, "Hook is weak. Viewers are leaving before the value prop."

## API Integration Plan

### YouTube Data API
*   **Endpoint:** `videos.list` (part: statistics)
*   **Endpoint:** `reports.query` (YouTube Analytics API) - *Requires higher auth scope*
    *   `metrics=views,averageViewDuration,subscribersGained`
    *   `dimensions=video`
    *   `filters=video==VIDEO_ID`

### Google Search Console API
*   **Endpoint:** `searchAnalytics.query`
*   **Metrics:** `clicks`, `impressions`, `ctr`, `position`
*   **Dimension:** `page` (filter by blog post URL)


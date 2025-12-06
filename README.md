# Schedule Goose

Schedule Goose is a comprehensive content scheduling and management platform designed to help creators plan, visualize, and optimize their digital content strategy.

## Project Overview

This project is a monorepo application featuring a modern React frontend and a lightweight Hono backend. It aims to streamline the workflow of content creators by providing tools for scheduling, visualizing, and analyzing content across different media formats.

## Core Features

### 📅 Content Scheduling & Calendar
- **Visual Planning:** Organize your content with an intuitive calendar view.
- **Scheduling Tools:** Manage publication dates and times for your posts.
- **Content Carousel:** A dynamic view to browse through your upcoming scheduled content.

### 🎨 Content Management
- **Multi-format Support:** seamless handling of various content types including:
  - **Video:** Preview and schedule video content.
  - **Audio:** Manage podcasts and audio clips.
  - **Image:** Organize visual posts and graphics.
  - **Text:** Draft and schedule text-based updates.

### 🚀 Creator Utilities
- **Performance Predictor:** (Planned) Tools to analyze and predict the potential engagement of your posts before they go live.
- **Thumbnail Generator:** (Planned) Automated generation of engaging thumbnails for your media content.

## Tech Stack

**Frontend:**
- **Framework:** React (Vite)
- **Routing:** TanStack Router
- **Validation:** Zod
- **Styling:** CSS Modules

**Backend:**
- **Server:** Hono (Node.js adapter)
- **Runtime:** Node.js / TSX

## Getting Started

1. **Install Dependencies:**
   ```bash
   pnpm install
   ```

2. **Run Development Servers:**

   *Frontend:*
   ```bash
   cd apps/frontend
   pnpm dev
   ```

   *Backend:*
   ```bash
   cd apps/backend
   pnpm dev
   ```


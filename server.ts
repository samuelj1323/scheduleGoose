import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

interface scheduledContent {
  id: number;
  title: string;
  platform: string;
  status: string;
  description: string;
  publishDate: Date;
  file: File | null;
}
const app = express();
const port = 3000;

// Add middleware
app.use(cors());
app.use(express.json());

const schedule: scheduledContent[] = [
  {
    id: 1,
    title: "Hello World!",
    platform: "youtube",
    description: "This is a test description",
    status: "scheduled",
    publishDate: new Date("2025-05-01"),
    file: null,
  },
];

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/v1/scheduledContent", (req: Request, res: Response) => {
  res.status(200).json({
    content: schedule,
  });
});
app.post("/api/v1/scheduledContent", (req: Request, res: Response) => {
  try {
    schedule.push({ ...req.body, id: schedule.length + 1 });
    console.log(req);
    res.status(201).json({
      content: schedule,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create scheduled content",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

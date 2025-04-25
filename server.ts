import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3000;

// Add middleware
app.use(cors());
app.use(express.json());

const scheduledContent = [
  {
    id: 1,
    title: "Hello World!",
    type: "video",
    status: "scheduled",
  },
];

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/v1/scheduledContent", (req: Request, res: Response) => {
  res.status(200).json({
    content: scheduledContent,
  });
});
app.post("/api/v1/scheduledContent", (req: Request, res: Response) => {
  scheduledContent.push(req.body);
  res.json({
    content: scheduledContent,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

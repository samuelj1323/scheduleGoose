import express from "express";
import db from "../db.js";
import { AuthRequest } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", (req: AuthRequest, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const getPosts = db.prepare(`
        SELECT * FROM posts WHERE userId = ? ORDER BY postDate DESC
        `);
    console.log(`get posts: ${JSON.stringify(getPosts)}`);

    const results = getPosts.all(userId);
    res.json({ content: results, id: userId });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

export default router;

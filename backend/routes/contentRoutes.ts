import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  // Responds with user-specific content
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const getPosts = db.prepare(`
        SELECT * FROM posts WHERE userId = ? ORDER BY postDate DESC
        `);
    console.log(`get posts: ${getPosts}`);

    const results = getPosts.all(userId);
    res.json({ content: results });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

export default router;

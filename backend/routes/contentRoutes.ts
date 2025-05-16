import express from "express";
import db from "../db.js";
import { AuthRequest } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();
const uploadsDir = path.join(process.cwd(), "backend/uploads");

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", (req: AuthRequest, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const getPosts = db.prepare(`
        SELECT * FROM posts WHERE userId = ? ORDER BY publishDate DESC
        `);

    const results = getPosts.all(userId);
    res.json({ content: results, id: userId });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

router.post("/", upload.single("file"), (req: AuthRequest, res) => {
  const userId = req.userId;
  const { postName, description, publishDate, createdDate, platform, status } =
    req.body;

  // Get the file path if a file was uploaded
  const filePath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const insertQuery = db.prepare(`
      INSERT INTO posts (
        userId,
        postName,
        description, 
        file,
        publishDate,
        createdDate,
        platform,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertQuery.run(
      userId,
      postName,
      description,
      filePath,
      publishDate,
      createdDate,
      platform,
      status
    );

    res.json({ id: result.lastInsertRowid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: String(err) });
  }
});

export default router;

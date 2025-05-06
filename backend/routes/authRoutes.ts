import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

interface User {
  userId: number;
  username: string;
  password: string;
  userFirstName: string;
  userLastName: string;
}

router.post("/register", (req, res) => {
  const { username, password, userFirstName, userLastName } = req.body;
  console.log(`userName: ${username} password: ${password}`);
  // hash the password
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    const insertUser = db.prepare(
      `INSERT into users (username, password, userFirstName, userLastName) VALUES (?, ?, ?, ?) `
    );
    const results = insertUser.run(
      username,
      hashedPassword,
      userFirstName,
      userLastName
    );

    const id = results.lastInsertRowid as number;

    const token = jwt.sign({ id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "3h",
    });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.sendStatus(503);
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  try {
    // get the user from the table
    const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
    const user = getUser.get(username) as User | undefined;

    if (!user) {
      return res.status(404).send({ message: "User is not found" });
    }

    const passwordIsSame = bcrypt.compareSync(password, user.password);
    if (!passwordIsSame) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.userId },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "3h" }
    );

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
});

export default router;

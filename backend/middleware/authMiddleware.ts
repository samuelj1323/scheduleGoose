import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  userId?: number;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (!process.env.JWT_SECRET) {
    return res
      .status(500)
      .json({ message: `${JSON.stringify(process.env.JWT_SECRET)}` });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "invalid token" });
    }
    if (!decoded || typeof decoded === "string") {
      return res.status(401).json({ message: "invalid token format" });
    }
    req.userId = decoded.id;
    next();
  });
};

export default authMiddleware;

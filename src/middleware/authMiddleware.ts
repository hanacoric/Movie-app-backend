import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUserDocument } from "../models/User";

export interface AuthRequest extends Request {
  user?: IUserDocument;
}

interface JwtPayload {
  _id: string;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      const user = await User.findById(decoded._id).select("-password");

      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

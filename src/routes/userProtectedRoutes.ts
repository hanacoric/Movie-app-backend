import express from "express";
import { protect } from "../middleware/authMiddleware";
import { AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/profile", protect, (req: AuthRequest, res) => {
  res.json(req.user);
});

export default router;

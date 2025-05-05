import express from "express";
import { protect } from "../middleware/authMiddleware";
import { AuthRequest } from "../middleware/authMiddleware";

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get current user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Unauthorized
 */

const router = express.Router();

router.get("/profile", protect, (req: AuthRequest, res) => {
  res.json(req.user);
});

export default router;

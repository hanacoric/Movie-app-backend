import express from "express";
import { protect } from "../middleware/authMiddleware";
import { AuthRequest } from "../middleware/authMiddleware";
import { getUserLists } from "../controllers/userController";

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
  /api/users/lists:
 *   get:
 *     summary: Get all movie lists for the authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user movie lists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 watchedMovies:
 *                   type: array
 *                   items:
 *                     type: string
 *                 watchlist:
 *                   type: array
 *                   items:
 *                     type: string
 *                 favoriteMovies:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Unauthorized, missing or invalid token
 */

const router = express.Router();

router.get("/profile", protect, (req: AuthRequest, res) => {
  res.json(req.user);
});
router.get("/lists", protect, (req, res, next) => {
  getUserLists(req, res).catch(next);
});

export default router;

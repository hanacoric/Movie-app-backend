import express, { Request, Response } from "express";
import { protect, AuthRequest } from "../middleware/authMiddleware";
import { getUserLists } from "../controllers/userController";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", protect, (req: AuthRequest, res: Response) => {
  res.json(req.user);
});

/**
 * @swagger
 * /api/users/lists:
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
router.get(
  "/lists",
  protect,
  asyncHandler(async (req: Request, res: Response) => {
    await getUserLists(req as AuthRequest, res);
  })
);

export default router;

import express, { Request, Response } from "express";
import { protect, AuthRequest } from "../middleware/authMiddleware";
import { getUserLists } from "../controllers/userController";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Authenticated user operations
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags: [Users]
 *     summary: Get current user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
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
 *     tags: [Users]
 *     summary: Get all movie lists for the authenticated user
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
 *                     type: object
 *                     properties:
 *                       imdbID:
 *                         type: string
 *                       title:
 *                         type: string
 *                       year:
 *                         type: string
 *                       poster:
 *                         type: string
 *                 watchlist:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       imdbID:
 *                         type: string
 *                       title:
 *                         type: string
 *                       year:
 *                         type: string
 *                       poster:
 *                         type: string
 *                 favoriteMovies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       imdbID:
 *                         type: string
 *                       title:
 *                         type: string
 *                       year:
 *                         type: string
 *                       poster:
 *                         type: string
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

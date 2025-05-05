import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  addToMovieList,
  removeFromMovieList,
} from "../controllers/movieListController";

/** SWAGGER for /add **/

/**
 * @swagger
 * /api/movies/add:
 *   post:
 *     summary: Add a movie to user's list
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - listName
 *               - movieId
 *             properties:
 *               listName:
 *                 type: string
 *                 enum: [watchlist, favoriteMovies, watchedMovies]
 *               movieId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie added to list
 *       400:
 *         description: Invalid request
 */

/** SWAGGER for /remove **/

/**
 * @swagger
 * /api/movies/remove:
 *   post:
 *     summary: Remove a movie from user's list
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - listName
 *               - movieId
 *             properties:
 *               listName:
 *                 type: string
 *                 enum: [watchlist, favoriteMovies, watchedMovies]
 *               movieId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie removed from list
 *       400:
 *         description: Invalid request
 */

const router = express.Router();

router.post("/add", protect, addToMovieList);
router.post("/remove", protect, removeFromMovieList);

export default router;

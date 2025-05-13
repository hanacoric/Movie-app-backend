import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  addToMovieList,
  removeFromMovieList,
  getTopRatedMovies,
} from "../controllers/movieListController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movie Lists
 *   description: User movie list management
 */

/**
 * @swagger
 * /api/movies/add:
 *   put:
 *     tags: [Movie Lists]
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
 *                 description: The list to add the movie to
 *               movieId:
 *                 type: string
 *                 description: IMDB movie ID
 *     responses:
 *       200:
 *         description: Movie added to list
 *       400:
 *         description: Invalid request or movie already exists in list
 *       401:
 *         description: Unauthorized
 */
router.put("/add", protect, addToMovieList);

/**
 * @swagger
 * /api/movies/remove:
 *   put:
 *     tags: [Movie Lists]
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
 *                 description: The list to remove the movie from
 *               movieId:
 *                 type: string
 *                 description: IMDB movie ID
 *     responses:
 *       200:
 *         description: Movie removed from list
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.put("/remove", protect, removeFromMovieList);

/**
 * @swagger
 * /api/movies/top-rated:
 *   get:
 *     tags: [Movie Lists]
 *     summary: Get top 10 highest-rated movies
 *     description: Fetches the top 10 movies based on average user ratings and number of reviews.
 *     responses:
 *       200:
 *         description: A list of top-rated movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   movieId:
 *                     type: string
 *                     description: Movie IMDB ID
 *                   title:
 *                     type: string
 *                     description: Movie title
 *                   poster:
 *                     type: string
 *                     description: Poster URL
 *                   year:
 *                     type: string
 *                     description: Release year
 *                   avgRating:
 *                     type: number
 *                     format: float
 *                     description: Average rating (1-5 stars)
 *       500:
 *         description: Failed to fetch top-rated movies
 */
router.get("/top-rated", getTopRatedMovies);

export default router;

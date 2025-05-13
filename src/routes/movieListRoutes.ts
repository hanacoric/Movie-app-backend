import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  addToMovieList,
  removeFromMovieList,
  getTopRatedMovies,
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

router.put("/add", protect, addToMovieList);
router.put("/remove", protect, removeFromMovieList);
router.get("/top-rated", getTopRatedMovies);
/** SWAGGER for /top-rated **/

/**
 * @swagger
 * /api/movies/top-rated:
 *   get:
 *     summary: Get top 10 highest-rated movies
 *     description: Fetches the top 10 movies based on average review rating. Returns poster, title, year, and average rating.
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
 *                     description: ID of the movie
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
 *                     description: Average star rating (1.0 - 5.0)
 *       500:
 *         description: Failed to fetch top-rated movies
 */

import Review from "../models/Review";
import Movie from "../models/Movie";

export default router;

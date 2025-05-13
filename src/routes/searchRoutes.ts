import express from "express";
import { searchMovies } from "../controllers/searchController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search movies using OMDb API
 */

/**
 * @swagger
 * /api/search:
 *   get:
 *     tags: [Search]
 *     summary: Search for movies using OMDb
 *     description: Searches the OMDb database for movies matching the provided query string.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie title or keyword to search for
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Page number for paginated results
 *     responses:
 *       200:
 *         description: A list of matching movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Search:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Title:
 *                         type: string
 *                       Year:
 *                         type: string
 *                       imdbID:
 *                         type: string
 *                       Type:
 *                         type: string
 *                       Poster:
 *                         type: string
 *                 totalResults:
 *                   type: string
 *                 Response:
 *                   type: string
 *       400:
 *         description: No search query provided
 *       404:
 *         description: No movies found
 *       500:
 *         description: Server error
 */
router.get("/", searchMovies);

export default router;

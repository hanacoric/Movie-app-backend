import express from "express";
import { searchMovies } from "../controllers/searchController";

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search for movies using OMDb
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie search keyword
 *     responses:
 *       200:
 *         description: A list of matching movies
 *       400:
 *         description: No search query provided
 *       404:
 *         description: No movies found
 */

const router = express.Router();

router.get("/", searchMovies);

export default router;

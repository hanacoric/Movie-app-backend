import express from "express";
import { getMovieById } from "../controllers/getMovieById";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Retrieve single movie details
 */

/**
 * @swagger
 * /api/movie/{id}:
 *   get:
 *     tags: [Movies]
 *     summary: Get movie details by IMDb ID
 *     description: Fetches movie details from OMDb API using IMDb ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: IMDb ID of the movie (e.g., tt0111161)
 *     responses:
 *       200:
 *         description: Movie data returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imdbID:
 *                   type: string
 *                 title:
 *                   type: string
 *                 year:
 *                   type: string
 *                 poster:
 *                   type: string
 *                 genre:
 *                   type: string
 *                 director:
 *                   type: string
 *                 actors:
 *                   type: string
 *                 plot:
 *                   type: string
 *                 ratings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Source:
 *                         type: string
 *                       Value:
 *                         type: string
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
router.get("/movie/:id", getMovieById);

export default router;

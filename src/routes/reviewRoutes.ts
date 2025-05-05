import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createReview,
  getReviewsByMovie,
  deleteReview,
} from "../controllers/reviewController";

/** SWAGGER for POST /api/reviews **/
/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - reviewText
 *               - rating
 *               - movieId
 *             properties:
 *               title:
 *                 type: string
 *               reviewText:
 *                 type: string
 *               rating:
 *                 type: number
 *               movieId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created
 *       500:
 *         description: Server error
 */

/** SWAGGER for GET /api/reviews/{movieId} **/
/**
 * @swagger
 * /api/reviews/{movieId}:
 *   get:
 *     summary: Get all reviews for a movie
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews
 *       500:
 *         description: Server error
 */

/** SWAGGER for DELETE /api/reviews/{id} **/
/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Review not found
 */

const router = express.Router();

router.post("/", protect, createReview); // Create a new review

router.get("/:movieId", getReviewsByMovie); // Get all reviews for a movie

router.delete("/:id", protect, deleteReview); // Delete a review

export default router;

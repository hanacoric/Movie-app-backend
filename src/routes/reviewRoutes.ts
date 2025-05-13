import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createReview,
  getReviewsByMovie,
  deleteReview,
  updateReview,
  getUserReviewForMovie,
  getAllReviewsByUser,
} from "../controllers/reviewController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Manage movie reviews
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     tags: [Reviews]
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
 *       403:
 *         description: reCAPTCHA failed
 *       500:
 *         description: Server error
 */
router.post("/", protect, createReview);

/**
 * @swagger
 * /api/reviews/user:
 *   get:
 *     tags: [Reviews]
 *     summary: Get all reviews by the current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/user", protect, getAllReviewsByUser);

/**
 * @swagger
 * /api/reviews/user/{movieId}:
 *   get:
 *     tags: [Reviews]
 *     summary: Get the current user's review for a specific movie
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: IMDb movie ID
 *     responses:
 *       200:
 *         description: User's review for the movie
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/user/:movieId", protect, getUserReviewForMovie);

/**
 * @swagger
 * /api/reviews/{movieId}:
 *   get:
 *     tags: [Reviews]
 *     summary: Get all reviews for a movie
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: IMDb movie ID
 *     responses:
 *       200:
 *         description: List of reviews for the movie
 *       500:
 *         description: Server error
 */
router.get("/:movieId", getReviewsByMovie);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     tags: [Reviews]
 *     summary: Delete a review
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review deleted
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Review not found
 */
router.delete("/:id", protect, deleteReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     tags: [Reviews]
 *     summary: Update a review
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewText:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Review updated
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Review not found
 */
router.put("/:id", protect, updateReview);

export default router;

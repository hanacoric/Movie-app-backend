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
router.post("/", protect, createReview);

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
router.get("/:movieId", getReviewsByMovie);

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
router.delete("/:id", protect, deleteReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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

/**
 * @swagger
 * /api/reviews/user/{movieId}:
 *   get:
 *     summary: Get a user's review for a movie
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's review
 *       500:
 *         description: Server error
 */
router.get("/user/:movieId", protect, getUserReviewForMovie);

router.get("/user", protect, getAllReviewsByUser);
/**
 * @swagger
 * /api/reviews/user:
 *   get:
 *     summary: Get all reviews by the current logged-in user
 *     tags:
 *       - Reviews
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
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   reviewText:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   movieId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
export default router;

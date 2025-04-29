import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createReview,
  getReviewsByMovie,
  deleteReview,
} from "../controllers/reviewController";

const router = express.Router();

router.post("/", protect, createReview); // Create a new review

router.get("/:movieId", getReviewsByMovie); // Get all reviews for a movie

router.delete("/:id", protect, deleteReview); // Delete a review

export default router;

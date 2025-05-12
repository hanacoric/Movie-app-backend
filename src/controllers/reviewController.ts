import { Request, Response } from "express";
import Review from "../models/Review";
import { AuthRequest } from "../middleware/authMiddleware";

// Create a new review
export const createReview = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { title, reviewText, rating, movieId } = req.body;
  const userId = req.user?._id;

  try {
    const newReview = await Review.create({
      title,
      reviewText,
      rating,
      movieId,
      userId,
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all reviews for a movie
export const getReviewsByMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { movieId } = req.params;

  try {
    const reviews = await Review.find({ movieId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a review
export const deleteReview = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?._id;

  try {
    const review = await Review.findById(id);

    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    if (review.userId.toString() !== userId?.toString()) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a review
export const updateReview = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { reviewText, rating } = req.body;
  const userId = req.user?._id;

  try {
    const review = await Review.findById(id);

    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    if (review.userId.toString() !== userId?.toString()) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    review.reviewText = reviewText;
    review.rating = rating;
    await review.save();

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get current users review for a movie
export const getUserReviewForMovie = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?._id;
  const { movieId } = req.params;

  try {
    const review = await Review.findOne({ userId, movieId });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all reviews by a user

export const getAllReviewsByUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?._id;

  try {
    const reviews = await Review.find({ userId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

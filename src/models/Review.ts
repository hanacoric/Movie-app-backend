import mongoose from "mongoose";

// Defines a movie with title, review text, rating, createdAt, and userId and movieID properties

export interface IReview {
  title: string;
  reviewText: string;
  rating: number;
  createdAt: Date;
  userId: string; // ID of the user who wrote the review
  movieId: string; // ID of the movie being reviewed
}

export interface IReviewDocument extends IReview, mongoose.Document {}

const reviewSchema = new mongoose.Schema<IReviewDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userId: {
      // ID of the user who wrote the review
      type: String,
      required: true,
    },
    movieId: {
      // ID of the movie being reviewed
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model<IReviewDocument>("Review", reviewSchema);
export default Review;

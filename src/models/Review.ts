import mongoose, { Document, Schema } from "mongoose";
export interface IReview {
  title: string;
  reviewText: string;
  rating: number;
  userId: mongoose.Types.ObjectId; // Referencing User model
  movieId: string; // OMDb movie ID
}

export interface IReviewDocument extends IReview, Document {}

const reviewSchema = new Schema<IReviewDocument>(
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
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

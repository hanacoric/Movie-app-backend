import mongoose from "mongoose";

//defines a movie with title, description, releaseYear, genre, director, cast, rating, reviews, poster

export interface IMovie {
  title: string;
  description: string;
  releaseYear: number;
  genre: string[];
  director: string;
  cast: string[];
  rating: number;
  reviews: string[];
  poster: Blob | string; // Blob is not directly supported in mongoose, so we use string for the poster URL
  // poster: string; // Use string for the URL of the poster image
}

export interface IMovieDocument extends IMovie, mongoose.Document {}

const movieSchema = new mongoose.Schema<IMovieDocument>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    cast: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [String],
      default: [],
    },
    poster: {
      type: String, // Use string for the URL of the poster image
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model<IMovieDocument>("Movie", movieSchema);
export default Movie;

import mongoose, { Document, Schema } from "mongoose";

export interface IMovie {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
}

export interface IMovieDocument extends IMovie, Document {}

const movieSchema = new Schema<IMovieDocument>(
  {
    imdbID: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model<IMovieDocument>("Movie", movieSchema);
export default Movie;

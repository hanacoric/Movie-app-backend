import mongoose, { Document } from "mongoose";

//defines a user with username, email, password, watchedMovies, watchlist, favoriteMovies and isAdmin properties
export interface IUser {
  username: string;
  email: string;
  password: string;
  watchedMovies: string[];
  watchlist: string[];
  favoriteMovies: string[];
  isAdmin: boolean;
}

export interface IUserDocument extends IUser, Document {}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    watchedMovies: {
      type: [String],
    },
    watchlist: {
      type: [String],
    },
    favoriteMovies: {
      type: [String],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUserDocument>("User", userSchema);
export default User;

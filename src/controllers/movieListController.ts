import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import User from "../models/User";

// Add a movie to a list
export const addToMovieList = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { listName, movieId } = req.body;
  const user = req.user;

  if (
    !user ||
    !["watchlist", "favoriteMovies", "watchedMovies"].includes(listName)
  ) {
    res.status(400).json({ message: "Invalid request" });
    return;
  }

  if ((user[listName as keyof typeof user] as string[]).includes(movieId)) {
    res.status(400).json({ message: "Movie already in list" });
    return;
  }

  (user[listName as keyof typeof user] as string[]).push(movieId);
  await user.save();

  res.status(200).json({ message: `Added to ${listName}` });
};

// Remove a movie from a list
export const removeFromMovieList = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { listName, movieId } = req.body;
  const user = req.user;

  if (
    !user ||
    !["watchlist", "favoriteMovies", "watchedMovies"].includes(listName)
  ) {
    res.status(400).json({ message: "Invalid request" });
    return;
  }

  (user[listName as keyof typeof user] as string[]) = (
    user[listName as keyof typeof user] as string[]
  ).filter((id: string) => id !== movieId);

  await user.save();

  res.status(200).json({ message: `Removed from ${listName}` });
};

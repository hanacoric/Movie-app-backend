import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import User from "../models/User";
import Review from "../models/Review";

type MovieListName = "watchlist" | "favoriteMovies" | "watchedMovies";

const isValidList = (listName: string): listName is MovieListName =>
  ["watchlist", "favoriteMovies", "watchedMovies"].includes(listName);

// Add a movie to a list
export const addToMovieList = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { listName, movieId } = req.body;
  const user = req.user;

  if (!user || !isValidList(listName)) {
    res.status(400).json({ message: "Invalid request" });
    return;
  }

  if (user[listName].includes(movieId)) {
    res.status(400).json({ message: "Movie already in list" });
    return;
  }

  user[listName].push(movieId);
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

  if (!user || !isValidList(listName)) {
    res.status(400).json({ message: "Invalid request" });
    return;
  }

  user[listName] = user[listName].filter((id: string) => id !== movieId);
  await user.save();

  res.status(200).json({ message: `Removed from ${listName}` });
};

// Get top 10 highest rated movies
export const getTopRatedMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const topMovies = await Review.aggregate([
      {
        $group: {
          _id: "$movieId",
          avgRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
      { $sort: { avgRating: -1, reviewCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "imdbID",
          as: "movieDetails",
        },
      },
      { $unwind: "$movieDetails" },
      {
        $project: {
          movieId: "$_id",
          avgRating: { $round: ["$avgRating", 1] },
          title: "$movieDetails.title",
          poster: "$movieDetails.poster",
          year: "$movieDetails.year",
        },
      },
    ]);

    res.status(200).json(topMovies);
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    res.status(500).json({ message: "Failed to fetch top-rated movies" });
  }
};

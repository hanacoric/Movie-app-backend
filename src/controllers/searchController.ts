import axios from "axios";
import { Request, Response } from "express";
import { OMDbSearchResponse } from "../types/omdb";

export const searchMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { query, page } = req.query;

  if (!query) {
    res.status(400).json({ message: "No search query provided" });
    return;
  }

  try {
    const omdbResponse = await axios.get<OMDbSearchResponse>(
      `http://www.omdbapi.com/`,
      {
        params: {
          apikey: process.env.OMDB_API_KEY,
          s: query,
          page,
        },
      }
    );

    if (omdbResponse.data.Response === "False") {
      res.status(404).json({ message: omdbResponse.data.Error });
      return;
    }

    res.json(omdbResponse.data.Search);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

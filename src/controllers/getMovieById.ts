import axios from "axios";
import { Request, Response } from "express";

interface OmdbResponse {
  Response: string;
  Error?: string;
  [key: string]: any;
}

export const getMovieById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const omdbRes = await axios.get<OmdbResponse>("http://www.omdbapi.com/", {
      params: {
        apikey: process.env.OMDB_API_KEY,
        i: id,
        plot: "full",
      },
    });

    if (omdbRes.data.Response === "False") {
      res.status(404).json({ message: omdbRes.data.Error });
      return;
    }

    res.json(omdbRes.data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

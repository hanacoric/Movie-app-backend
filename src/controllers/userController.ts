import User, { IUserDocument } from "../models/User";
import { generateToken } from "../utils/generateToken";
import { hashPassword, matchPassword } from "../utils/hashedPassword";
import { RequestHandler } from "express";
import { verifyRecaptcha } from "../utils/verifyRecaptcha";
import { AuthRequest } from "../middleware/authMiddleware";
import { Request, Response } from "express";
import axios from "axios";

// @desc    Register a new user
// @route   POST /api/users/register

export const registerUser: RequestHandler = async (req, res) => {
  const { username, email, password } = req.body;
  const { recaptchaToken } = req.body;

  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    res.status(403).json({ message: "reCAPTCHA failed. Please try again." });
    return;
  }

  try {
    const userExists = (await User.findOne({ email })) as IUserDocument;

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = (await User.create({
      username,
      email,
      password: hashedPassword,
      watchedMovies: [],
      watchlist: [],
      favoriteMovies: [],
    })) as IUserDocument;

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Authenticate a user and get token
// @route   POST /api/users/login
export const loginUser: RequestHandler = async (req, res) => {
  const { email, password, recaptchaToken } = req.body;

  const isHuman = await verifyRecaptcha(recaptchaToken);

  if (!isHuman) {
    res.status(403).json({ message: "reCAPTCHA failed. Please try again." });
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await matchPassword(password, user.password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserLists = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.user?.id) {
    console.error("❌ No user ID found in request.");
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  console.log("👤 Fetching user from DB with ID:", req.user.id);
  const userFromDB = await User.findById(req.user.id);

  if (!userFromDB) {
    console.error("❌ User not found in DB.");
    res.status(404).json({ message: "User not found" });
    return;
  }

  try {
    const fetchOMDbData = async (imdbID: string) => {
      try {
        const response = await axios.get<{
          Response: string;
          Error?: string;
          imdbID: string;
          Title: string;
          Year: string;
          Poster: string;
        }>(`https://www.omdbapi.com/`, {
          params: {
            apikey: process.env.OMDB_API_KEY,
            i: imdbID,
          },
        });

        const data = response.data;

        if (data.Response === "False") {
          console.warn(`⚠️ OMDb Error: ${data.Error} (ID: ${imdbID})`);
          return null;
        }

        return {
          imdbID: data.imdbID,
          title: data.Title,
          year: data.Year,
          poster: data.Poster,
        };
      } catch (err) {
        console.error(`❌ OMDb fetch failed for ${imdbID}`, err);
        return null;
      }
    };

    console.log("📦 Fetching movie details for lists...");

    const watchedMovies = (
      await Promise.all(userFromDB.watchedMovies.map(fetchOMDbData))
    ).filter(Boolean);
    const watchlist = (
      await Promise.all(userFromDB.watchlist.map(fetchOMDbData))
    ).filter(Boolean);
    const favoriteMovies = (
      await Promise.all(userFromDB.favoriteMovies.map(fetchOMDbData))
    ).filter(Boolean);

    console.log("✅ Successfully fetched all lists.");

    res.status(200).json({
      watchedMovies,
      watchlist,
      favoriteMovies,
    });
    return;
  } catch (error) {
    console.error("🔥 Server error in getUserLists:", error);
    res.status(500).json({ message: "Server error", error });
    return;
  }
};

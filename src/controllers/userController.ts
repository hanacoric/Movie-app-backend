import User, { IUserDocument } from "../models/User";
import { generateToken } from "../utils/generateToken";
import { hashPassword, matchPassword } from "../utils/hashedPassword";
import { RequestHandler } from "express";

// @desc    Register a new user
// @route   POST /api/users/register

export const registerUser: RequestHandler = async (req, res) => {
  const { username, email, password } = req.body;

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
  const { email, password } = req.body;

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
    res.status(500).json({ message: "Server error" });
  }
};

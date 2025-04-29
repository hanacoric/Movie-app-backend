import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  addToMovieList,
  removeFromMovieList,
} from "../controllers/movieListController";

const router = express.Router();

router.post("/add", protect, addToMovieList);
router.post("/remove", protect, removeFromMovieList);

export default router;

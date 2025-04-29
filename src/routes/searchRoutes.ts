import express from "express";
import { searchMovies } from "../controllers/searchController";

const router = express.Router();

router.get("/", searchMovies);

export default router;

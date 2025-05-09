// src/routes/movieRoutes.ts
import express from "express";
import { getMovieById } from "../controllers/getMovieById";

const router = express.Router();

router.get("/movie/:id", getMovieById);

export default router;

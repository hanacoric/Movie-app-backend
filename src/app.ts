import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import userProtectedRoutes from "./routes/userProtectedRoutes";
import movieListRoutes from "./routes/movieListRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use("/api/users", userRoutes);
app.use("/api/users", userProtectedRoutes);
app.use("/api/movies", movieListRoutes);
export default app;

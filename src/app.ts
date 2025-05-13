import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import userProtectedRoutes from "./routes/userProtectedRoutes";
import movieListRoutes from "./routes/movieListRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import searchRoutes from "./routes/searchRoutes";
import movieRoutes from "./routes/movieRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5175",
      "https://movie-app-backend-ujpg.onrender.com", // Swagger or hosted calls
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use("/api/users", userRoutes);
app.use("/api/users", userProtectedRoutes);
app.use("/api/movies", movieListRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/search", searchRoutes);
app.use("/api", movieRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;

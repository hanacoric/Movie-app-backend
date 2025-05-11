import app from "./app";
import { connectDB } from "./config/db";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("OMDb Key loaded in server.ts:", process.env.OMDB_API_KEY);
console.log("MONGO URI loaded in server.ts:", process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
  });
};

startServer();

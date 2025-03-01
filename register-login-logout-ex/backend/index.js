import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 5000;

try {
  const connection = mongoose.connect(process.env.MONGO_URI);
  if (connection) {
    console.log(`Database connected: ${connection.connection?.host}`);
  }
} catch (error) {
  console.log(`Error connecting database : ${error.message}`);
}

import userRoutes from "./routes/user.route.js";
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

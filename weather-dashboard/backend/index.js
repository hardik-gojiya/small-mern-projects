import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
app.use(cors());
dotenv.config({
  path: ".env",
});

app.get("/wheather", async (req, res) => {
    const city = req.query.city
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`
    );
    console.log(response.data)
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch weather data", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import { use, useState } from "react";
import axios from "axios";
import "./App.css";
import { cities } from "./assets/cities";

function App() {
  const [city, setCity] = useState("");
  const [wheather, setWheather] = useState(null);

  const getWeather = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/wheather?city=${city}`
      );
      setWheather(res.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <>
      <h1>Wheather App</h1>
      <select
        name="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      <button onClick={getWeather}>Get Weather</button>

      {wheather && (
        <div>
          <h2>{wheather.name}</h2>
          <p>Temperature: {wheather.main.temp}°C</p>
          <p>Condition: {wheather.weather[0].description}</p>
        </div>
      )}
    </>
  );
}

export default App;

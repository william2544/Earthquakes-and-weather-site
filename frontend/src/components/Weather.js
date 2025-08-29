import React, { useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
        const res = await fetch("/api/weather", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ city }),
        });

        const data = await res.json();

        if (!data.success) {
            setError(data.error);
            setWeatherData(null);
        } else {
            setWeatherData(data);
            setCity("");
        }
        } catch (err) {
        setError("Something went wrong. Please try again.");
        }
    };

  return (
    <div>
      <h2>Weather Information</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          required
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}

      {weatherData && (
        <div>
          <h3>Weather in {weatherData.city}</h3>
          <p>Temperature: {weatherData.temperature} °C</p>
          <p>Description: {weatherData.description}</p>
          <p>Wind Speed: {weatherData.wind} m/s</p>
          <p>Humidity: {weatherData.humidity} %</p>
        </div>
      )}
    </div>
  );
}

export default Weather;

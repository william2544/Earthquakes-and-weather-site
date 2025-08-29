import React, { useEffect, useState } from "react";
import "../components/styles/EarthquakeList.css";

function EarthquakeList() {
  const [quakes, setQuakes] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  // Get user location once on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
          console.log("Accuracy:", pos.coords.accuracy, "meters");
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation not supported by your browser");
    }
  }, []);

  // Fetch quakes once location is known
  useEffect(() => {
    if (location) {
      fetch("/api/earthquakes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: location.lat,
          long: location.lon, // ⚠️ must match backend key
          radius: 500,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setQuakes(data.features || []);
        })
        .catch((err) => console.error("Error fetching earthquakes:", err));
    }
  }, [location]);

  return (
    <div>
      <h2>Earthquake</h2>
      <h2>
        Recent Earthquakes (500 km around{" "}
        {location ? "your location" : "detecting..."} )
      </h2>

      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}

      <ul>
        {quakes.map((q) => (
          <li key={q.id} style={{ listStyle: "none", marginBottom: "10px" }}>
            {q.properties.place} — Magnitude: {q.properties.mag}
          </li>
        ))}
      </ul>
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Magnitude</th>
            <th>Time</th>
            <th>Depth</th>
          </tr>
        </thead>
        <tbody>
          {quakes.map((q) => (
            <tr key={q.id}>
              <td data-label="Place">{q.properties.place}</td>
              <td data-label="Magnitude">{q.properties.mag}</td>
              <td data-label="Time">{new Date(q.properties.time).toLocaleString()}</td>
              <td data-label="Depth">{q.geometry.coordinates[2]} km</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EarthquakeList;

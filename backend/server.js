import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// creating an earthquicke API server

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  home route
app.get("/", (req, res) => {
    // res.render("index.ejs",{city:null, temperature:null, description:null, wind:null, humidity:null, earthquakes:null});
    // res.render("../frontend/frontend/src/App.js",{city:null, temperature:null, description:null, wind:null, humidity:null, earthquakes:null});
    res.json({
      city: null,
      temperature: null,
      description: null,
      wind: null,
      humidity: null,
      earthquakes: null,
      message: "Welcome to the Earthquake and Weather Alerts API"
    });
})
app.get("/quick",(req,res)=>{
    res.render('quick.ejs',{data:null})
})

// ✅ Earthquake Alerts Route
app.post("/api/earthquakes", async (req, res) => {
  try {
    const lat = req.body['lat'];
    const lon = req.body['long'];
    const radius = req.body['radius'];

    // Build USGS API URL
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2025-07-25&endtime=2025-08-25&latitude=${lat}&longitude=${lon}&maxradiuskm=${radius}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data); // Send to frontend
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch earthquake data" });
  }
});

// ✅ Weather Alerts Route (Free endpoint)
app.post("/api/weather", async (req, res) => {
  const city = req.body['city']

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      return res.status(404).json({ success: false, error: data.message });
    }
    console.log(data);

    res.json({
      success: true,
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      wind: data.wind.speed,
      humidity: data.main.humidity,
      weather: data.weather[0].main
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🌍 Server running on http://localhost:${PORT}`);
});
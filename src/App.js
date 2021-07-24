import React, { useState } from "react";
import aboutVector from "./assets/about-vector.png";
import { SocialIcon } from "react-social-icons";
import keys from "./keys";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

// const BASE_URL = process.env.REACT_APP_BASE_URL;
// const API_KEY = process.env.REACT_APP_API_KEY;

require("dotenv").config();

function App() {
  const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())

        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };

  return (
    <div className="weat">
      <div
        className="vector-container position-absolute bottom-0 left-0 "
        style={{ zIndex: "-10" }}
      >
        <img
          src={aboutVector}
          alt="img"
          className="vector-img img-fluid"
          style={{ maxWidth: "100%" }}
        />
      </div>
      <div
        className="vector-container position-absolute bottom-0 left-0 "
        style={{ zIndex: "-8" }}
      >
        <img
          src={aboutVector}
          alt="img"
          className="vector-img img-fluid"
          style={{
            maxWidth: "70%",
            filter: " brightness(98%)",
          }}
        />
      </div>

      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-container">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date"> {dateBuild(new Date())}</div>
            </div>

            <div className="weather-container">
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <h1 className="error">ENTER A VALID LOCATION</h1>
        )}
      </main>
      <div className="social-icons d-flex flex-column position-absolute end-0 pe-4 pt-5 mt-5 top-0">
        <SocialIcon
          className="pb-2 px-2 mx-2 mb-2 social-icon"
          url="https://twitter.com/"
        />
        <SocialIcon
          className="p-2 m-2 social-icon"
          url="https://linkedin.com/in/palakg01"
        />
        <SocialIcon
          className="p-2 m-2 social-icon"
          url="https://github.com/palakg01"
        />
        <SocialIcon
          className="p-2 m-2 social-icon"
          url="https://instagram.com/palxkkz"
        />
        <SocialIcon
          className="p-2 m-2 social-icon"
          url="https://youtube.com/"
        />
        <SocialIcon
          className="pt-2 mt-2 px-2 mx-2 social-icon"
          url="https://facebook.com/"
        />
      </div>
    </div>
  );
}

export default App;

import Axios from "axios";
import React, { useState } from "react";
import City from "./City";
import SearchArea from "./searchArea";
import background from "../assets/images/background.png"

export default function App() {
  const [cities, setCities] = useState(JSON.parse(window.localStorage.getItem("weather") || "[]"));


  function deleteCity(id) {
    setCities((prev) => {
      let newCities =  prev.filter((city) => {
        return id !== city.id;
      });
      window.localStorage.setItem("weather",JSON.stringify(newCities));
      return newCities;
    });
  }

  function getWeatherData(dest) {
    const url2 =
      "https://app.geocodeapi.io/api/v1/search?apikey="+process.env.REACT_APP_GEO_API_KEY+"&text=" +
      dest +
      "&size=1";
    Axios.get(url2)
      .then((response) => {
        if (!response || response === undefined) {
          return;
        }
        const latAndLon = response.data.features[0].geometry.coordinates;
        dest =
          response.data.features[0].properties.name.substring(0, 12) +
          "," +
          (response.data.features[0].properties.region_a !== undefined
            ? response.data.features[0].properties.region_a.substring(0, 5)
            : response.data.features[0].properties.continent.substring(0, 3));
        const newUrl =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          latAndLon[1] +
          "&lon=" +
          latAndLon[0] +
          "&appid="+process.env.REACT_APP_WEATHER_API_KEY+"&units=imperial";

        return Axios.get(newUrl); // using response.data
      })
      .then((response) => {
        if (!response || response === undefined) {
          return;
        }

        setCities((prev) => {
          window.localStorage.setItem("weather",JSON.stringify([...prev, { ...response.data, city: dest, id: Date.now() }]))
          return [...prev, { ...response.data, city: dest, id: Date.now() }];
        });
      });
  }

  return (
    <div className={cities.length===0 ? "App-default": "App-default"} style={{  height:"100%", backgroundImage: `url(${background})`}}>
      <h1>My Weather</h1>
      <div className="">

      <div className=" search col-xs-12"> <SearchArea getCoor={getWeatherData} /></div>
      <div className="row">
        {cities.length > 0 ? (
          cities.map((c, index) => {
            return (
              <div key={index} className=" col-xs-12 col-lg-6 col-xl-4">
                <City key={c.id} id={c.id} data={c} delFunc={deleteCity} />
              </div>
            );
          })
        ) : (
          <div className="empty-space"></div>
        )}
        <div className="bottom"></div>
      </div>
      </div>
    </div>
  );
}

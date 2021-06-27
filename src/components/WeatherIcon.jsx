import React from "react";


export default function WeatherIcon(props) {
  const hour = new Date().getHours();
  return (
    <div className={props.border ? "imageDiv" : ""}>
      <img
        className="image"
        src={
          "http://openweathermap.org/img/wn/" +
          props.icon +
          (hour >= 18 ? "n" : "d") +
          (props.size ? "@" + props.size + "x" : "") +
          ".png"
        }
        alt="weather-icon"
      ></img>
    </div>
  );
}

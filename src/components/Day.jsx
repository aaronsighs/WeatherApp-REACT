import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function Day(props) {
  const today = new Date();
  const nextDay = new Date(today + 1);
  return (
    <div className={props.id === 4 ? "lastday" : "day"}>
      <p>
        {nextDay.setDate(nextDay.getDate() + props.id + 1) && null}
        {nextDay
          .toLocaleDateString("en-US", { weekday: "long" })
          .substring(0, 3)}
      </p>
      <WeatherIcon icon={props.data.weather[0].icon.substring(0, 2)} />
      <p>{props.data.temp.max}°</p>
      <p>{props.data.temp.min}°</p>
    </div>
  );
}

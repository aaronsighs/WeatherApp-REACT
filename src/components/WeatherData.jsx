import React from "react";


export default function weatherData(props) {
  let day = new Date();

  return (
    <div className="temp-for">
      <h3>{day.toLocaleDateString("en-US", { weekday: "long" })}</h3>
      <div>
        <div className="weath-data">
          <div>
            <p>{props.data.daily[0].temp.max}°</p>
          </div>

          <div>
            <p>{props.data.daily[0].temp.min}°</p>
          </div>
        </div>

        <div className="weath-data">
          <h4>{props.data.current.temp}°</h4>
        </div>

        <div className="weath-data">
          <div>
            <p>{props.data.current.weather[0].main}</p>
          </div>
          <div>
            <p>{props.data.current.weather[0].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

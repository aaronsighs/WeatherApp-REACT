import React, { useState } from "react";
import WeatherIcon from "./WeatherIcon";
import Day from "./Day";
import WeatherData from "./WeatherData";
import Graph from "./Graph";
import Particles from "react-particles-js";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CloseIcon from "@material-ui/icons/Close";


export default function City(props) {
  const [hover, setHover] = useState(false);
  const [isVis, setIsVis] = useState(true);
  const [showVisIcon, setShowVisIcon] = useState(false);
  const w_type = props.data.current.weather[0].main;
  const [weatherMode, setWeatherMode] = useState({
    particles: {
      number: {
        value:
          w_type === "Clouds"
            ? 20
            : w_type === "Clear"
            ? 0
            : w_type === "Fog" || w_type === "Haze"
            ? 1
            : w_type === "Snow"
            ? 28
            : 20,
        density: {
          enable: true,
          value_area: 100
        }
      },
      shape: {
        type:
          w_type === "Rain" || w_type === "Fog" || w_type === "Haze"
            ? "edge"
            : "circle",
        stroke: {
          width: 0
        }
      },
      opacity: {
        anim: {
          speed: w_type === "Fog" ? 0.1 : w_type === "Snow" ? 3.75 : 0
        },
        value: w_type === "Clouds" ? 0.2 : w_type === "Snow" ? 2 : 0.15
      },
      size: {
        value:
          w_type === "Clouds"
            ? 30
            : w_type === "Snow"
            ? 3.25
            : w_type === "Fog" || w_type === "Haze"
            ? 300
            : 1.75
      },
      move: {
        direction: w_type === "Clouds" || w_type === "Mist" ? "left" : "bottom",
        bounce: false,
        straight: true,
        out_mode: "out",
        speed:
          w_type === "Clouds" || w_type === "Mist"
            ? 0.2
            : w_type === "Snow"
            ? 1.6
            : w_type === "Fog" || w_type === "Haze"
            ? 0.15
            : 7.5
      },
      line_linked: {
        enable: false,
        shadow: {
          enable: true,
          color: "#3CA9D1",
          blur: 5
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            }
          }
        }
      }
    }
  });


  function click() {
    setIsVis((pre) => !pre);
  }



  return (
    <div>
      <div
        onMouseLeave={() => setHover(false)}
        onMouseOver={() => setHover(true)}
        className="box"
      >
        {/* icon */}
        <div className="del">
          {hover && (
            <CloseIcon
              onClick={() => {
                props.delFunc(props.id);
              }}
            />
          )}
        </div>
        <div className="cityName">
          <h3>{props.data.city}</h3>
        </div>
        <div
          onMouseOver={() => setShowVisIcon(true)}
          onMouseLeave={() => setShowVisIcon(false)}
        >
          {showVisIcon && <VisibilityIcon onClick={click} className="vis" />}

          {isVis && (
            <Particles
              className="weather"
              params={weatherMode}
              style={{
                width: "100%"
              }}
            />
          )}
          <WeatherIcon
            border={1}
            icon={props.data.current.weather[0].icon.substring(0, 2)}
            size="2"
          />
        </div>

        <WeatherData data={props.data} />
        <Graph data={props.data.hourly} />
        <div className="container-day">
          {Array(5)
            .fill(null)
            .map((d, index) => {
              return (
                <Day
                  key={index + " "}
                  id={index}
                  data={props.data.daily[index + 1]}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

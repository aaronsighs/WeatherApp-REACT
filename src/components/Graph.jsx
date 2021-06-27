import React from "react";
import { Line } from "react-chartjs-2";

export default function Graph(props) {
  const temps = props.data.map((val) => val.temp);
  const hours = props.data.map((val) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minutes: "numeric"
    };
    //new Date(val.dt * 1000).getUTCFullYear()
    return new Date(val.dt * 1000).toLocaleDateString("en-US", options);
  });
  const data = {
    labels: hours,
    datasets: [
      {
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(173,216,230,0.4)",
        //"rgba(75,192,192,0.4)"
        borderCapStyle: "butt",
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: temps,
        gridLineWidth: 0
      }
    ]
  };
  const options = {
    scaleFontSize: 0,
    scaleShowLabels: false,
    labels: {
      display: false
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            display: false
          }
        }
      ]
    }
  };

  return <Line className="graph" data={data} options={options} />;
}

import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export class Density extends Component {
  render() {
    const { curvesData } = this.props;
    const xLabelsTemp = Object.keys(curvesData["Strategy"]).map(item =>
      item.slice(0, 4)
    );
    const xLabels = [];
    const xLabelIndex = [];
    const aa = [];
    xLabelsTemp.map(item => {
      if (!xLabels.includes(item)) {
        xLabels.push(item);
      } else {
        xLabels.push("");
      }
    });
    xLabels.map((item, index) => {
      if (item !== "") {
        xLabelIndex.push(index);
      }
      aa.push(["", item]);
    });

    // console.log("XIndex", xLabelIndex);
    // console.log("AA:", aa);
    const data = {
      // labels: Object.keys(strategyData),
      labels: xLabelsTemp,
      datasets: [
        {
          label: "Strategy",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(3, 28, 58)",
          borderColor: "rgb(3, 28, 58)",
          borderWidth: 0.0001,
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(3, 28, 58)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(3, 28, 58)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: Object.values(curvesData["Strategy"])
        },
        {
          label: "Benchmark",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#697781",
          borderColor: "#697781",
          borderCapStyle: "butt",
          borderWidth: 0.0001,
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: Object.values(curvesData["Benchmark"])
        },
        {
          label: "Long Contribution",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "green",
          borderColor: "green",
          borderCapStyle: "butt",
          borderWidth: 0.0001,
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: Object.values(curvesData["Long Contribution"])
        },
        {
          label: "Short Contribution",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "red",
          borderColor: "red",
          borderCapStyle: "butt",
          borderWidth: 0.0001,
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: Object.values(curvesData["Short Contribution"])
        },
        {
          label: "Buy & Hold Underlying",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(0, 191, 255)",
          borderColor: "rgb(0, 191, 255)",
          borderCapStyle: "butt",
          borderWidth: 0.0001,
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: Object.values(curvesData["Buy & Hold Underlying"])
        },
        {
          label: "Risk free Asset",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#ced3ff",
          borderColor: "#ced3ff",
          borderCapStyle: "butt",
          borderWidth: 0.0001,
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: Object.values(curvesData["Risk free Asset"])
        }
      ]
    };
    const options = {
      responsive: true,
      title: {
        display: true,
        text: "Equity Curve"
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Year"
            }
            // type: "time"
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Dollars"
            },
            ticks: {
              callback: function(value, index, values) {
                return "$" + value / 1000000 + "M";
              }
            },
            gridLines: {
              drawBorder: false,
              color: [
                "#031c30",
                "#697781",
                "#9ca5ab",
                "#818e9e",
                "#b8b870",
                "#ced3ff"
              ]
            }
          }
        ]
      }
    };

    return <Line data={data} options={options} />;
  }
}

export default Density;

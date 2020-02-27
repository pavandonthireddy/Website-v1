import React, { Component } from "react";
import * as d3 from "d3";

class BootstrapGraph extends Component {
  componentDidMount() {
    const { data, avm } = this.props;
    this.drawGraph(data, avm);
  }

  kernelDensityEstimator(kernel, X) {
    return function(V) {
      return X.map(function(x) {
        return [
          x,
          d3.mean(V, function(v) {
            return kernel(x - v);
          })
        ];
      });
    };
  }

  kernelEpanechnikov(k) {
    return function(v) {
      return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
    };
  }

  drawGraph(data, avm) {
    const margin = { top: 30, right: 30, bottom: 30, left: 50 };
    const width = 530 - margin.left - margin.right;
    const height = 530 - margin.top - margin.bottom;
    var svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3
      .scaleLinear()
      .domain([-5, 5])
      .range([0, width]);

    var y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, 1]);

    const xAxis = d3.axisBottom(x).ticks(10);
    const yAxis = d3.axisLeft(y).ticks(10);
    const xAxisGrid = d3
      .axisBottom(x)
      .tickSize(-height)
      .tickFormat("")
      .ticks(10);
    const yAxisGrid = d3
      .axisLeft(y)
      .tickSize(-width)
      .tickFormat("")
      .ticks(10);
    svg
      .append("g")
      .attr("class", "x axis-grid")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxisGrid);
    svg
      .append("g")
      .attr("class", "y axis-grid")
      .call(yAxisGrid);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    svg
      .append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width / 2 + ",0)")
      .call(yAxis);
    svg
      .append("line")
      .attr("x1", 5)
      .attr("y1", 30)
      .attr("x2", 20)
      .attr("y2", 30)
      .style("stroke", "black");
    // svg
    //   .append("line")
    //   .attr("x1", 0)
    //   .attr("y1", 60)
    //   .attr("x2", 20)
    //   .attr("y2", 60)
    //   .style("stroke", "black");
    svg
      .append("text")
      .attr("x", 30)
      .attr("y", 30)
      .text("GM:" + avm.toString())
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
    // svg
    //   .append("text")
    //   .attr("x", 0)
    //   .attr("y", 60)
    //   .text("variable B")
    //   .style("font-size", "15px")
    //   .attr("alignment-baseline", "middle");
    svg
      .append("line")
      .attr("x1", width / 2 - 60)
      .attr("y1", height)
      .attr("x2", width / 2 - 60)
      .attr("y2", 1)
      .style("stroke", "black");
    svg
      .append("text") // text label for the x axis
      .attr("x", width / 2)
      .attr("y", height + 30)
      .style("text-anchor", "middle")
      .text("Geometric mean");
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Density");

    // Compute kernel density estimation
    var kde = this.kernelDensityEstimator(
      this.kernelEpanechnikov(1),
      x.ticks(40)
    );
    var density = kde(data);

    // Plot the area
    svg
      .append("path")
      .attr("class", "mypath")
      .datum(density)
      .attr("fill", "#99ccff")
      .attr("opacity", ".8")
      .attr("stroke", "#031c30")
      .attr("stroke-width", 3)
      .attr("stroke-linejoin", "round")
      .attr(
        "d",
        d3
          .line()
          .curve(d3.curveBasis)
          .x(function(d) {
            return x(d[0]);
          })
          .y(function(d) {
            return y(d[1]);
          })
      );
  }

  render() {
    return <div id="my_dataviz"></div>;
  }
}

export default BootstrapGraph;

import React, { useEffect, useState } from "react";
import * as d3 from "d3";

function Chart({ data }) {
  const heading = data.description.title;

  const parseTime = d3.timeParse("%y");

  let yTemp = [];
  let xYear = [];

  Object.keys(data.data).map((key, i) => {
    yTemp.push(data.data[key]);
    xYear.push(key);
  });

  const url =
    "https://www.ncdc.noaa.gov/cag/global/time-series/globe/land_ocean/1/10/1880-2020/data.json";

  // labels
  const x_label = "Year";
  const y_label = "Temperature";
  const location_name = heading;

  const margin = { left: 120, right: 30, top: 60, bottom: 30 },
    width = document.querySelector("body").clientWidth,
    height = 525;

  const svg = d3.select("svg").attr("viewBox", [0, 0, width, height]);

  // add title
  svg
    .append("text")
    .attr("class", "svg_title")
    .attr("x", (width - margin.right + margin.left) / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "22px")
    .text(`${y_label} of ${location_name}`);

  // add y label
  svg
    .append("text")
    .attr("text-ancho", "middle")
    .attr(
      "transform",
      `translate(${margin.left - 70}, ${
        (height - margin.top - margin.bottom + 180) / 2
      }) rotate(-90)`
    )
    .style("font-size", "26px")
    .text(y_label);

  // add x label
  svg
    .append("text")
    .attr("class", "svg_title")
    .attr("x", (width - margin.right + margin.left) / 2)
    .attr("y", height - margin.bottom - margin.top + 60)
    .attr("text-anchor", "middle")
    .style("font-size", "26px")
    .text(x_label);

  const x_scale = d3.scaleLinear().range([margin.left, width - margin.right]);
  const y_scale = d3
    .scaleLinear()
    .range([height - margin.bottom - margin.top, margin.top]);

  const ticks = 10;

  const x_axis = d3
    .axisBottom()
    .scale(x_scale)
    .tickPadding(10)
    .ticks(ticks)
    .tickSize(-height + margin.top * 2 + margin.bottom);

  const y_axis = d3
    .axisLeft()
    .scale(y_scale)
    .tickPadding(5)
    .ticks(ticks, ".1")
    .tickSize(-width + margin.left + margin.right);

  // convert precipitationProbability to % gotten from this thread https://stackoverflow.com/questions/38078924/d3-js-axis-percentage-values-with-decimals
  //   y_axis.tickFormat((d) => {
  //     if (!Number.isInteger(d)) {
  //       d = decimalFormatter(d);
  //     }
  //     return d + "%";
  //   });

  const year = (d) => d.year;
  const temperature = (d) => d.temp;

  const line_generator = d3
    .line()
    .x((d) => x_scale(year(d)))
    .y((d) => y_scale(temperature(d)))
    .curve(d3.curveBasis);

  d3.json(url).then(({ data }) => {
    let temperatures = [];

    Object.keys(data).map((key, i) => {
      //   const year = parseTime(key);
      const year = key;
      const temp = data[key];

      temperatures.push({ year: year, temp: temp });
    });

    const d = temperatures;

    let xLabels = temperatures.year;
    let yLabels = temperatures.temp;

    let date = d.sort((a, b) => +a.year - +b.year);

    x_scale.domain(d3.extent(d, year)).nice(ticks);

    y_scale.domain(d3.extent(d, temperature)).nice(ticks);

    // append x axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom - margin.top})`)
      .call(x_axis);
    // add y axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(y_axis);

    // add the line path
    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 4)
      .attr("d", line_generator(d));
  });

  return (
    <div>
      <h1> {heading} </h1>
      <svg></svg>
    </div>
  );
}

export default Chart;

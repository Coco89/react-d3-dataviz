import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./Chart.css";

function DropDown({ data }) {
  const [value, setValue] = useState("");
  const [valueTo, setValueTo] = useState("");
  const [valueFrom, setValueFrom] = useState("");

  const onChange = (event) => {
    event.preventDefault();
    if (event.target.id === "to") {
      setValueTo(event.target.valueTo);
      //hide values on x-axis - https://developer.mozilla.org/en-US/docs/Web/API/Event/target
      update(event.target.id, event.target.value);
    } else if (event.target.id === "from") {
      setValueFrom(event.target.valueFrom);
      //hide values on x-axis - https://developer.mozilla.org/en-US/docs/Web/API/Event/target
      update(event.target.id, event.target.value);
    } else {
      setValue(event.target.value);
    }
  };

  let years = Object.keys(data).map((key, i) => {
    const year = key;
    const temp = data[key];

    return (
      <option key={i} value={year}>
        {year}
      </option>
    );
  });

  return (
    <div>
      <form className="row gy-2 gx-3 align-items-center">
        <div className="mb-3 col-auto">
          <label htmlFor="fromYear" className="form-label">
            From:
          </label>
          <select
            id="from"
            name="from"
            value={valueFrom}
            className="form-select"
            aria-label="Select year"
            onChange={onChange}
          >
            <option defaultValue>Select Year</option>
            {years}
          </select>
        </div>
        <div className="mb-3 col-auto">
          <label htmlFor="toYear" className="form-label">
            To:
          </label>
          <select
            id="to"
            name="to"
            value={valueTo}
            className="form-select"
            aria-label="Select year"
            onChange={onChange}
          >
            <option defaultValue>Select Year</option>
            {years}
          </select>
        </div>

        <div className="mb-3 col-auto">
          <label
            htmlFor="formGroupExampleInput2"
            className="form-label"
          ></label>
          <button type="reset" className="btn btn-primary reset">
            Reset Dates
          </button>
        </div>
      </form>
    </div>
  );
}

//used to update x-axis with new min and max values upon dropdown selection
function update(prep, val) {
  console.log("prep", prep, "val", val);
  // d3.selectAll("svg > *").remove();
}

function Chart({ data }) {
  const svgRef = useRef();
  const heading = data.description.title;
  const url =
    "https://www.ncdc.noaa.gov/cag/global/time-series/globe/land_ocean/1/10/1880-2020/data.json";

  // labels
  const x_label = "Year";
  const y_label = "Temperature";
  const location_name = heading;

  const onChange = (event) => {
    console.log("inside Chart on change event: ", event);
    event.preventDefault();
    // if (event.target.id === "to") {
    //   setValueTo(event.target.valueTo);
    //   //hide values on x-axis - https://developer.mozilla.org/en-US/docs/Web/API/Event/target
    //   update(event.target.id, event.target.value);
    // } else if (event.target.id === "from") {
    //   setValueFrom(event.target.valueFrom);
    //   //hide values on x-axis - https://developer.mozilla.org/en-US/docs/Web/API/Event/target
    //   update(event.target.id, event.target.value);
    // } else {
    //   setValue(event.target.value);
    // }
  };

  useEffect(() => {


    // seeting margin, width, and height
    const margin = { left: 120, right: 30, top: 60, bottom: 30 },
      width = document.querySelector("body").clientWidth,
      height = 1250;

    // render svg
    const svg = d3.select(svgRef.current).attr("viewBox", [0, 0, width, height]);

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
        `translate(${margin.left - 70}, ${(height - margin.top - margin.bottom + 180) / 2
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

    // ticks: number of ticks displayed
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

    // convert y axis to have 2 decimal places
    y_axis.tickFormat((d) => {
      return d3.format(".2f")(d / 1);
    });

    // convert x axis to have no comma
    x_axis.tickFormat((d) => {
      return d3.format("")(d / 1);
    });

    const year = (d) => d.year;
    const temperature = (d) => d.temp;

    const line_generator = d3
      .line()
      .x((d) => x_scale(year(d)))
      .y((d) => y_scale(temperature(d)))
      .curve(d3.curveBasis);

      let temperatures = [];

      Object.keys(data.data).map((key, i) => {
        const year = key;
        const temp = data.data[key];

        temperatures.push({ year: year, temp: temp });
      });

      const d = temperatures;

      //min and max for
      let minYear = d3.min(temperatures, (t) => t.year);
      let maxYear = d3.max(temperatures, (t) => t.year);

      // x_scale.domain(d3.extent(d, year)).nice(ticks);
      x_scale.domain([minYear, maxYear]).nice(ticks);

      // y_scale.domain(d3.extent(d, temperature)).nice(ticks);
      y_scale.domain([d3.min(temperatures, (t) => parseFloat(t.temp)), d3.max(temperatures, (t) => parseFloat(t.temp))]).nice(ticks);

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
        .attr("stroke-width", 2)
        .attr("d", line_generator(d));

  }, []);

  return (
    <div className="container">
      <h1 className="heading"> {heading} </h1>
      <DropDown onChange={onChange} data={data.data} />
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default Chart;

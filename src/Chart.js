import React, { useEffect, useState } from "react";

function Chart({ title, data }) {
  const heading = title.title;

  const temps = Object.keys(data).map((key, i) => {
      const year = key;
      const temp = data[key];

    return (
      <li key={i}>
        Year: {year} Temp: {data[temp]}
      </li>
    );
  });

  return (
    <div>
      <h1> {heading} </h1>
      <ul> {temps} </ul>
    </div>
  );
}

export default Chart;

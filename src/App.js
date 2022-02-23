import React, { useEffect, useState } from "react";
import "./App.css";
import Chart from "./Chart";
import Column from "./Column";

function App() {
  const [data, setData] = useState([]);

  // console.log("data ==>", data);
  // console.log("title ==>", data.description);
  // console.log("stats ==>", data.data);
  const title = data.description;
  const stats = data.data;

  useEffect(() => {
    fetch(
      "https://www.ncdc.noaa.gov/cag/global/time-series/globe/land_ocean/1/10/1880-2020/data.json"
    )
      .then((response) => response.json())
      .then(setData)
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Chart title={title} data={stats} />
      <Column />
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import * as d3 from "d3";
import Chart from "./Chart";
import Column from "./Column";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    d3.json(
      "https://www.ncdc.noaa.gov/cag/global/time-series/globe/land_ocean/1/10/1880-2020/data.json"
    ).then((data) => {
      setData(data);
      setLoading(false);
    });
    return () => undefined;
  }, [data]);

  return (
    <div className="container">
      {loading && <div>loading</div>}
      {!loading && <Chart data={data} />}
      {/* {!loading && <Chart title={data.description} data={data.data} />} */}
      <Column />
    </div>
  );
}

export default App;

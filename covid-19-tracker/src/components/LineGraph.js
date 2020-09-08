import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const LineGraph = () => {
  const [data, setDate] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  const buildChartData = data => {
    const chartData = [];
    let lastDataPoint;

    data.cases.forEach(date => {
      if(lastDataPoint) {
        const newDataPoint ={
          x: date,
          y: data['cases'][date] - lastDataPoint
        }
      }
    })

  }

  return (
    <div>
      <h1>Graph</h1>
    </div>
  );
};

export default LineGraph;

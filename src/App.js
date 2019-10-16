import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart } from "react-google-charts";

const options = {
  title: "This Week's Assignments",
  vAxis: {
    title: "Hours",
    titleTextStyle: {
      italic: false
    }
  }
};

const data = [
  ['Assignment', 'Median Hours Spent', { role: 'style' }],
  ['EECS 336 Assignment 1', 8, ''],
  ['EECS 336 Assignment 2', 10, 'red'],
  ['EECS 336 Assignment 3', 9, ''],
  ['EECS 336 Assignment 4', 5, '']
];

function App() {


  return (
    <div className={"my-pretty-chart-container"}>

      <Chart
        chartType="ColumnChart"
        data={data}
        options={options}
        width="80%"
        height="400px"
        legendToggle
      />
    </div>
  );
}

export default App;

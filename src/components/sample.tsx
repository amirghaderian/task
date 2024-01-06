import ReactEcharts from "echarts-for-react";
import dataChart from "../services/servers.json"
const MyChartComponent = () => {
  console.log(dataChart)
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: dataChart[2].time_series,
        type: "line",
      },
    ],
  };
  return (
    <ReactEcharts option={option} style={{ height: "400px", width: "100%" }} />
  );
};

export default MyChartComponent;

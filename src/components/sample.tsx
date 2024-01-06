import ReactEcharts from "echarts-for-react";
import dataChart from "../services/servers.json";
const MyChartComponent = ({ fId }) => {
  console.log(dataChart);
  const findItem = dataChart.find((item) => {return
    item.featureId===Number(fId)
  });
  console.log(findItem);
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

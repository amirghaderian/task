import ReactEcharts from "echarts-for-react";
import { useEffect, useRef, useState } from "react";
import data from "../../services/servers.json";

const Echart = ({ fId, onIdNumberChange, littleMapId }) => {
  const [timeSeries, setTimeSeries] = useState([]);

  const eChartsRef = useRef(null);

  const handleChart = () => {
    const findPointTimeSerie = data.find((item) => item.id === littleMapId)?.time_series;
    setTimeSeries(findPointTimeSerie || []);
  };

  useEffect(() => {
    handleChart();
  }, [littleMapId]);

  const findItem = data.find((item) => item.id === fId);
  const daynamictimeSeri = [
    {
      name: "Search Engine",
      type: "line",
      stack: "Total",
      data: findItem?.time_series || [],
    },
    {
      name: "Clicked Points",
      type: "line",
      stack: "Total",
      data: timeSeries.map((point, index) => [index, point]),
    },
  ];

  const option = {
    title: {
      text: "Stacked Line",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Search Engine", "Clicked Points"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: daynamictimeSeri,
  };

  useEffect(() => {
    // You can handle dynamic changes to the series here
    if (eChartsRef && eChartsRef.current) {
      eChartsRef.current.getEchartsInstance().setOption(option);
    }
  }, [timeSeries, option]);

  return (
    <ReactEcharts
      option={option}
      style={{ height: "400px", width: "100%" }}
      className="w-[300px]"
      ref={eChartsRef}
    />
  );
};

export default Echart;

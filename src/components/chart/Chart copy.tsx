import ReactEcharts from "echarts-for-react";
import { useEffect, useRef, useState } from "react";
import data from "../../services/servers.json";

const Echart = ({ fId, onIdNumberChange, littleMapId }) => {
  const [timeSeries, setTimeSeries] = useState([]);
  const [points, setPoints] = useState([]);
  const eChartsRef = useRef(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const handleChart = () => {
    const findPointTimeSerie = data.find(
      (item) => item.id === littleMapId
    )?.time_series;
    setTimeSeries(findPointTimeSerie || []);
  };

  useEffect(() => {
    if (littleMapId) {
      console.log(littleMapId, "3111111");
      const findPoint = data.find((item) => item.id === littleMapId);
      setPoints((prev) => [...prev, findPoint]);
    }
  }, [littleMapId]);
  useEffect(() => {
    handleChart();
  }, [littleMapId]);

  const findItem = data.find((item) => item.id === fId);

  const pointsMap = points.map((point) => ({
    name: point.title,
    type: "line",
    data: point.time_series || [],
    smooth: true,
    emphasis: {
      focus: "series",
    },
  }));
  const daynamictimeSeri = [
    {
      name: "Search Engine",
      type: "line",
      smooth: true,
      data: findItem?.time_series || [],
    },
    ...pointsMap,
  ];

  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Search Engine", ...points.map((point) => point.title)],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {
          title: "دانلود چارت",
        },
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
    dataZoom: [
      {
        show: true, // نمایش ابزار زوم
        start: 0, // درصد شروع زوم
        end: 100, // درصد پایان زوم
        handleSize: "100%", // اندازه دسته زوم (تا 100% از نمودار)
        handleStyle: {
          color: "#fff",
          shadowBlur: 3,
          shadowColor: "rgba(0, 0, 0, 0.6)",
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        textStyle: {
          color: "#fff",
        },
      },
      {
        type: "inside",
        xAxisIndex: [0],
        start: 30,
        end: 70,
      },
    ],

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
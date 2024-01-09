import ReactEcharts from "echarts-for-react";
import { useEffect, useRef } from "react";
import data from "../../services/servers.json";

const Echart = ({ fId, littleMapId, timeSeries, points, setPoints }) => {
  const eChartsRef = useRef(null);
  console.log("12 points", points);

  useEffect(() => {
    console.log(points, "poing");
    if (littleMapId) {
      console.log(littleMapId, "3111111");
      const findPoint = data.find((item) => item.id === littleMapId);
      setPoints((prev) => [...prev, findPoint]);
    }
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
      emphasis: {
        focus: "series",
      },
    },
    ...pointsMap,
  ];

  const option = {
    timeline: {
      axisType: "category",
      data: [], // Provide your timeline data here
      currentIndex: 0,
      controlPosition: "left",
      autoPlay: false,
      playInterval: 1000,
      loop: false,
      emphasis: {
        controlStyle: {
          color: "#0078d4",
        },
      },
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Search Engine", ...points.map((point) => point.title)],
    },
    grid: {
      left: "13%",
      right: "4%",
      bottom: "7%",
      containLabel: false,
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
      data: [
        " شنبه",
        "یکشنبه",
        "دوشنبه",
        "سه شنبه",
        "چهارشنبه",
        "پنچشنبه",
        "جمعه",
      ],
    },
    yAxis: {
      type: "value",
    },
    dataZoom: [
      {
        show: true,
        start: 0,
        end: 100,
        handleSize: "100%",
        handleStyle: {
          color: "#fff",
          shadowBlur: 3,
          shadowColor: "rgba(44, 0, 0, 0.6)",
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        textStyle: {
          color: "rgba(44, 0, 0, 0.6)",
          fontSize: "22px",
        },
        emphasis: {
          handleSize: 8,
          textStyle: {
            color: "red",
          },
          brushStyle: {
            color: "rgba(255,255,255,0.1)",
          },
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
    if (eChartsRef && eChartsRef.current) {
      eChartsRef.current.getEchartsInstance().setOption(option);
    }
  }, [timeSeries, option]);

  console.log(timeSeries, "888");

  return (
    <ReactEcharts
      option={option}
      style={{ height: "330px", width: "70%" }}
      className="w-screen"
      ref={eChartsRef}
    />
  );
};

export default Echart;

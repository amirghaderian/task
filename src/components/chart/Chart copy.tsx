import ReactEcharts from "echarts-for-react";
import { useEffect, useRef, useState } from "react";
import data from "../../services/servers.json";

const Echart = ({ fId, onIdNumberChange, littleMapId }) => {
  const firstChart= data.find((item)=>item.id===fId)?.time_series
  console.log(firstChart,"firstChart");
  const [timeSeries, setTimeSeries] = useState(firstChart);

  console.log(onIdNumberChange);
  console.log(littleMapId);
  const eChartsRef = useRef(null as any);
  const handleChart = () => {
    const findPointTimeSerie = data.find(
      (item) => item.id === littleMapId
    )?.time_series;
    setTimeSeries(findPointTimeSerie);

    console.log(timeSeries);
  };
  useEffect(() => {
    handleChart();
  }, [littleMapId]);
  const findItem = data.find((item) => {
    return item.id === fId;
  });
  let daynamictimeSeri = [
    {
      name: "Search Engine",
      type: "line",
      stack: "Total",
      data: [findItem?.time_series],
    },
  ];
  let option = {
    title: {
      text: "Stacked Line",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
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
  setTimeout(function () {
    //get data filter when cliced onlittledmap and push or pop from serise and set option agin echart via usref
    //فکر کنم باید ازکامپوننت لیتل مپ یک ایونت هندلر پاس بدی به این  کامپوننت و اینجا هم خط کد های زیر رو با تغییر که باز با توجه با اینکه چی کلیک شده دیتا رو فیلتر کنی بزاری توی این هندلر
    daynamictimeSeri.push({
      name: "clicked point title",
      type: "line",
      stack: "",
      data: timeSeries,
    });
    if (eChartsRef && eChartsRef.current)
      eChartsRef.current?.getEchartsInstance().setOption(option);
  }, 0);

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

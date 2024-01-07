import ReactEcharts from "echarts-for-react";
import dataChart from "../../services/servers.json";
import React from "react";
const MyChartComponent = ({ fId,onIdNumberChange }) => {
  // console.log(dataChart);
  console.log(onIdNumberChange);
  const eChartsRef = React.useRef(null as any);

  const findItem = dataChart.find((item) => {
    return item.id ===fId;
  });
  let daynamictimeSeri=[ 
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data:  findItem?.time_series
    }
  ];
let option = {
    title: {
      text: 'Stacked Line'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: daynamictimeSeri
  };
  setTimeout(function(){
    //get data filter when cliced onlittledmap and push or pop from serise and set option agin echart via usref
    daynamictimeSeri.push({
      name: 'clicked point title',
      type: 'line',
      stack: '',
      data: [20,1,20,5,6,40,6]
    })
    if (eChartsRef && eChartsRef.current)
    eChartsRef.current?.getEchartsInstance().setOption(option);

  },5000)

  return (
    <ReactEcharts  option={option} style={{ height: "400px", width: "100%"}} className="w-[300px]"  ref={eChartsRef} />
  );
};

export default MyChartComponent;

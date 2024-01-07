import ReactEcharts from "echarts-for-react";
import dataChart from "../../services/servers.json";
const MyChartComponent = ({ fId,onIdNumberChange }) => {
  // console.log(dataChart);
  console.log(onIdNumberChange);
  const findItem = dataChart.find((item) => {
    return item.id ===fId;
  });
const option = {
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
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: findItem?.time_series
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        data:  findItem?.time_series
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        data:  findItem?.time_series
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        data:  findItem?.time_series
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        data:  findItem?.time_series
      }
    ]
  };
  
  
  return (
    <ReactEcharts  option={option} style={{ height: "400px", width: "100%"}} className="w-[300px]" />
  );
};

export default MyChartComponent;

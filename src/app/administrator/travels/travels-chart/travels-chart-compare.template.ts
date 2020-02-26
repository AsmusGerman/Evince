var spirit =
  "https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/15328337051547464164-256.png";
var maxData = 100;
export default {
  /*     tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    }, */
  /* title: {
        text:"Porcentaje de ocupación de colectivos"
    }, */
  grid: {
    left: "5%",
    right: "5%",
    top: 0,
    bottom: 0
  },
  xAxis: {
    max: maxData,
    splitLine: { show: false },
    offset: 10,
    axisLine: {
      lineStyle: {
        color: "#999"
      }
    },
    axisLabel: {
      margin: 10
    }
  },
  yAxis: {
    data: [],
    inverse: true,
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      margin: 10,
      color: "#999",
      fontSize: 16
    }
  },
  series: [
    {
      // current data
      type: "pictorialBar",
      symbol: spirit,
      symbolRepeat: "fixed",
      symbolMargin: "5%",
      symbolClip: true,
      symbolSize: 30,
      symbolBoundingData: maxData,
      data: [],
      markLine: {
        symbol: "none",
        label: {
          formatter: "max: {c} %",
          position: "start"
        },
        lineStyle: {
          color: "green",
          type: "dotted",
          opacity: 0.2,
          width: 2
        },
        data: [
          {
            type: "max"
          }
        ]
      },
      z: 10
    },
    {
      // full data
      type: "pictorialBar",
      itemStyle: {
        normal: {
          opacity: 0.2
        }
      },
      label: {
        show: true,
        formatter: function(params) {
          return ((params.value / maxData) * 100).toFixed(1) + " %";
        },
        position: "right",
        offset: [10, 0],
        color: "green",
        fontSize: 18
      },
      animationDuration: 0,
      symbolRepeat: "fixed",
      symbolMargin: "5%",
      symbol: spirit,
      symbolSize: 30,
      symbolBoundingData: maxData,
      data: [],
      z: 5
    }
  ]
};

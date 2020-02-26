var spirit =
  "https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/15328337051547464164-256.png";
var maxData = 100;
export default {
     tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter: function (data){
          console.log(data[0]);
          var v = data[0];
          return v.name+': '+v.data+'%';
        }
    },
  /* title: {
        text:"Porcentaje de ocupación de colectivos"
    }, */
  grid: {
    top: "5%",
    bottom: "5%",
    left: 0,
    right: "15%",
    containLabel: true
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
      margin: 8,
      color: "#999",
      fontSize: 8
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
      symbolSize: 20,
      symbolBoundingData: maxData,
      data: [],
      /* markLine: {
        symbol: "none",
        label: {
          formatter: "max: {c} %",
          position: "start",
          fontSize: 8
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
      }, */
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
        fontSize: 10
      },
      animationDuration: 0,
      symbolRepeat: "fixed",
      symbolMargin: "5%",
      symbol: spirit,
      symbolSize: 20,
      symbolBoundingData: maxData,
      data: [],
      z: 5
    }
  ]
};

export default {
  tooltip: {
    trigger: "axis",
    formatter: function(data) {
      var v = data[0];
      var decimalTime = v.value;
      decimalTime = decimalTime * 60 * 60;
      var hours = Math.floor(decimalTime / (60 * 60));
      decimalTime = decimalTime - hours * 60 * 60;
      var minutes = Math.floor(decimalTime / 60);
      return v.seriesName + ": " + hours + " hs y " + minutes + " min";
    }
  },
  grid: {
    top: "0%",
    bottom: "10%",
    left: "15%",
    right: "5%"
  },
  calculable: true,
  xAxis: [
    {
      type: "value",
      boundaryGap: [0, 0.01]
    }
  ],
  yAxis: [
    {
      type: "category",
      data: []
    }
  ],
  series: [
    {
      name: "Total en retrasos",
      type: "bar",
      data: []
    }
  ]
};

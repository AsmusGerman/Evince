export default {
    tooltip : {
      trigger: 'axis'
  },
    title : {
      text: 'Recorridos con más tiempo perdido en retrasos',
      //subtext: 'subtext'
  },
  // Changes width of X axis labels
  grid: {
  x: 175
  },
  calculable : true,
  xAxis : [
      {
          type : 'value',
          boundaryGap : [0, 0.01]
      }
  ],
  yAxis : [
      {
          type : 'category',
          data : []
      }
  ],
  series : [
      {
          name:'Total en retrasos',
          type:'bar',
          data:[]
      }
  ]
  };
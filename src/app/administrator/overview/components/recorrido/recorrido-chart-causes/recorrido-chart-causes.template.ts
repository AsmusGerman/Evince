export default {
    tooltip : {
      trigger: 'axis'
  },
    title : {
      text: 'Causas de retrasos por categoría',
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
          name:'serie a',
          type:'bar',
          data:[4,2,3,1,2]
      },
      {
        name:'serie b',
        type:'bar',
        data:[7,8,6,9,5]
    }
  ]
  };
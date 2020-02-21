var labelOption = {
    show: true,
    //rotate: 90,
    align: 'left',
    formatter: '{c}  {name|{a}}',
    verticalAlign: 'middle',
    position: 'insideLeft',
    distance: 15,
    rich: {
        name: {
            textBorderColor: '#fff'
        }
    }
};

export default {
    tooltip : {
      trigger: 'axis'
  },
    title : {
      text: 'Causas de retrasos por viaje',
      //subtext: 'subtext'
  },
  // Changes width of X axis labels
  grid: {
  x: 175
  },
  calculable : true,
  xAxis : [
    {
        type: 'value'
    }
  ],
  yAxis : [
    {
        type: 'category',
        axisTick: {show: false},
        data: []
    }
  ],
  series : [
      {
          name:'accidente',
          type:'bar',
          data:[1,2],
          label:labelOption
      },
      {
        name:'bar',
        type:'bar',
        data:[4,5],
        label:labelOption
    },
    {
        name:'foo',
        type:'bar',
        data:[9,8],
        label:labelOption
    }
  ]
};



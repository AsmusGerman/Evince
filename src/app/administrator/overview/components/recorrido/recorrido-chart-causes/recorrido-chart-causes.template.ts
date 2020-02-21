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
          name:'serie a',
          type:'bar',
          data:[4,2,3,1,2],
          label:labelOption
      },
      {
        name:'serie b',
        type:'bar',
        data:[7,8,6,9,5],
        label:labelOption
    }
  ]
};



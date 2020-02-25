export default {
    tooltip : {
      trigger: 'axis',
      formatter: function(data){
        var tooltipText=data[0].name;
        for (var i=0;i<data.length;i++){
          var v = data[i];
          var decimalTime = v.value;
          decimalTime = decimalTime * 60 * 60;
          var hours = Math.floor((decimalTime / (60 * 60)));
          decimalTime = decimalTime - (hours * 60 * 60);
          var minutes = Math.floor((decimalTime / 60));
          tooltipText+='<br>';
          tooltipText+=v.seriesName+': ';
          if(hours>0){
            tooltipText+=hours+' hs y ';
          }
          tooltipText+=minutes+' min';
      }
      return tooltipText;
    }
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
  ]
};



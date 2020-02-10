export default {
  tooltip : {
    trigger: 'axis'
},
  title : {
    text: 'Recorridos con más tiempo perdido en retrasos',
    //subtext: 'subtext'
},
legend: {
    data:['2011 Year', '2012 Year']
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
        data : ['Recorrido1', 'Recorrido2', 'Recorrido3', 'Recorrido4']
    }
],
series : [
    {
        name:'Total en retrasos',
        type:'bar',
        data:[45,68,100,130]
    }
]
};
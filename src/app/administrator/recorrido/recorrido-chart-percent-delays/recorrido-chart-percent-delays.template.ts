export default {
     tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    title : {
        text: '% de ocurrencia de retrasos para cada viaje',
    },
    legend: {
        data: []
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: []
    },
    series: [
        {
            name: '% de este viaje con retrasos',
            type: 'bar',
            stack: 'Total',
            label: {
                show: true,
                position: 'insideTopRight',
                formatter: '{c}%'
            },
            data: []
        },
        {
            name: '% de este viaje sin retrasos',
            type: 'bar',
            stack: 'Total',
            label: {
                show: true,
                position: 'insideTopRight',
                formatter: '{c}%'
            },
            data: []
        }
    ]
  };
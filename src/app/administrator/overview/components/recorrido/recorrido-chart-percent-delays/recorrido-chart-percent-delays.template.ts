export default {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['legend1','legend2','legend3','legend4','legend5']
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
        data: [/* 'cat1yaxis', 'cat2yaxis', 'cat3yaxis', 'cat4yaxis', 'cat5yaxis', 'cat6yaxis', 'cat7yaxis' */]
    },
    series: [
        {
            name: 'serie1',
            type: 'bar',
            stack: 'Total',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: [302, 230]
        },
        {
            name: 'serie2',
            type: 'bar',
            stack: 'Total',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: [698,770]
        }
    ]
  };
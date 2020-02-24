export default {
    tooltip: {
      trigger: "item",
      formatter: function(data){
        var v = data.data;
        var decimalTime = v['value'];
        decimalTime = decimalTime * 60 * 60;
        var hours = Math.floor((decimalTime / (60 * 60)));
        decimalTime = decimalTime - (hours * 60 * 60);
        var minutes = Math.floor((decimalTime / 60));
        return v['name']+': '+hours+' hs y '+minutes+' min';
    }
    },
    title : {
        text: 'Causas más comunes de retrasos (según tiempo perdido)',
    },
    series: [
      {
        name: "top-delay-causes",
        type: "pie",
        radius: [25, 150],
        center: ["50%", "50%"],
        //roseType: "true",
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: [
/*          { value: 10, name: "retraso 1" },
        { value: 5, name: "retraso 2" },
        { value: 15, name: "retraso 3" },
        { value: 25, name: "retraso 4" },
        { value: 20, name: "retraso 5" },
        { value: 35, name: "retraso 6" },
        { value: 30, name: "retraso 7" },
        { value: 40, name: "retraso 8" } */
        ]
      }
    ]
  };
export default {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/> {b} : {c} ({d}%)"
    },
    title : {
        text: 'Causas más comunes de retrasos',
        //subtext: 'subtext'
    },
    series: [
      {
        name: "top-delays",
        type: "pie",
        radius: [25, 100],
        center: ["50%", "50%"],
        //roseType: "radius",
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
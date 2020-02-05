export default {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/> {b} : {c} ({d}%)"
  },
  series: [
    {
      name: "top-delays",
      type: "pie",
      radius: [20, 110],
      center: ["25%", "50%"],
      roseType: "radius",
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: []
    }
  ]
};

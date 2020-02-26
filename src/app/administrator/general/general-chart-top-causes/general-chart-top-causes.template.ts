export default {
  tooltip: {
    trigger: "item",
    formatter: function(data) {
      var v = data.data;
      var decimalTime = v["value"];
      decimalTime = decimalTime * 60 * 60;
      var hours = Math.floor(decimalTime / (60 * 60));
      decimalTime = decimalTime - hours * 60 * 60;
      var minutes = Math.floor(decimalTime / 60);
      return v["name"] + ": " + hours + " hs y " + minutes + " min";
    }
  },
  /* title : {
        text: 'Causas más comunes de retrasos (según tiempo perdido)',
    }, */
    grid: {
      top: "5%",
      bottom: "5%",
      left: "5%",
      right: "5%"
    },
  series: [
    {
      name: "top-delay-causes",
      type: "pie",
      radius: [25, 75],
      center: ["50%", "50%"],
      animation: true,
      label: {
          position: 'outer',
          alignTo: 'none'
      },
      data: []
    }
  ]
};

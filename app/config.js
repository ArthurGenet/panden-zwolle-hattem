define([], function () {
  return {
    portalUrl: "http://jsapi.maps.arcgis.com/",
    itemId: "cb15de11a6a9451a9216af35b9ccba75",
    buildingLayerTitle: "Panden",
    heightField: "MAX_hoogte",
    usageField: ["is_bijeenk","is_gezondh","is_industr","is_kantoor","is_logies", "is_onderwi","is_winkel","is_kas"],
    yearField: "bouwjaar",
    timeline: {
      bin: 5,
      minYear: 1900,
      maxYear: 2020
    },
    noDataColor: "white",
    otherColor: "#FFB55A",
    yearClasses: [{
      minYear: 0,
      maxYear: 1899,
      color: "#bd0026",
      label: "<1900"
    }, {
      minYear: 1900,
      maxYear: 1924,
      color: "#f03b20",
      label: "1900 - 1924"
    }, {
      minYear: 1925,
      maxYear: 1949,
      color: "#fd8d3c",
      label: "1925 - 1949"
    }, {
      minYear: 1950,
      maxYear: 1974,
      color: "#feb24c",
      label: "1951 - 1974"
    }, {
      minYear: 1975,
      maxYear: 1999,
      color: "#fed976",
      label: "1975 - 1999"
    }, {
      minYear: 2000,
      maxYear: 2020,
      color: "#ffffb2",
      label: "2000 - 2020"
    }],
    heightVariable: {
      stops: [
        { value: 5, color: "#e0ecf4", label: "< 10m" },
        { value: 30, color: "#8856a7", label: "> 70m" }
      ],
      binSize: 5
    },
    usageValues: [{
      value: "Pand in gebruik",
      color: "#00FFC5",
      label: "Bijeenkomstfunctie"
    
    }]
  }
});

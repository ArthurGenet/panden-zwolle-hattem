define([], function () {
  return {
    portalUrl: "http://jsapi.maps.arcgis.com/",
    itemId: "cb15de11a6a9451a9216af35b9ccba75",
    buildingLayerTitle: "Panden",
    heightField: "MAX_hoogte",
    areaField: "oppervlak",
    usageField1: "is_bijeenk",
    usageField2: "is_winkel",
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
    areaClasses: [{
      minArea: 0,
      maxArea: 50,
      color: "#bd0026",
      label: "<50"
    }, {
      minArea: 50,
      maxArea: 100,
      color: "#f03b20",
      label: "50 - 100"
    }, {
      minArea: 100,
      maxArea: 200,
      color: "#fd8d3c",
      label: "100 - 200"
    }, {
      minArea: 200,
      maxArea: 350,
      color: "#feb24c",
      label: "200 - 350"
    }, {
      minArea: 350,
      maxArea: 500,
      color: "#fed976",
      label: "350 - 500"
    }, {
      minArea: 500,
      maxArea: 100000000,
      color: "#ffffb2",
      label: ">500"
    }],
    usageValues1: [{
      value: "bijeenkomstfunctie",
      color: "#00FFC5",
      label: "Bijeenkomstfunctie"
    }],
    usageValues2:[{
      value: "gezondheidszorgfunctie",
      color: "#E69800",
      label: "Gezondheidszorgfunctie"
    }],


    usage: [{
      value: "gezondheidszorgfunctie",
      color: "#E69800",
      label: "Gezondheidszorgfunctie"
    }, {
      value: "industriefunctie",
      color: "#B53535",
      label: "Industriefunctie"
    }, {
      value: "kantoorfunctie",
      color: "#8400A8",
      label: "Kantoorfunctie"
    }, {
      value: "logiesfunctie",
      color: "#376CBD",
      label: "Logiesfunctie"
    }, {
      value: "onderwijsfunctie",
      color: "#E600A9",
      label: "Onderwijsfunctie"
    },  {
      value: "winkelfunctie",
      color: "#FFFF00",
      label: "Winkelfunctie"
    }, {
      value: "kas",
      color: "#E1E1E1",
      label: "Kas"
    }]
  }
});

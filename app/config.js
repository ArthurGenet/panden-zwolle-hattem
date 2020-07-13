define([], function () {
  return {
    portalUrl: "http://jsapi.maps.arcgis.com/",
    itemId: "cb15de11a6a9451a9216af35b9ccba75",
    buildingLayerTitle: "Panden",
    heightField: "MAX_hoogte",
    areaField: "oppervlak",
    usageField1: "is_bijeenk",
    usageField2: "is_gezondh",
    usageField3: "is_industr",
    usageField4: "is_kantoor",
    usageField5: "is_logies",
    usageField6: "is_onderwi",
    usageField7: "is_winkel",
    usageField8: "is_kas",
    yearField: "bouwjaar",
    timeline: {
      bin: 5,
      minYear: 1900,
      maxYear: 2020
    },
    noDataColor: "white",
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
        { value: 20, color: "#8856a7", label: "> 70m" }
      ],
      binSize: 5
    },
    areaClasses: [{
      minArea: 0,
      maxArea: 50,
      color: "#FEFF01",
      label: "< 50m2"
    }, {
      minArea: 50,
      maxArea: 100,
      color: "#DEFF00",
      label: "50 - 100m2"
    }, {
      minArea: 100,
      maxArea: 200,
      color: "#AAFF01",
      label: "100 - 200m2"
    }, {
      minArea: 200,
      maxArea: 350,
      color: "#73FF00",
      label: "200 - 350m2"
    }, {
      minArea: 350,
      maxArea: 500,
      color: "#30FF00",
      label: "350 - 500m2"
    }, {
      minArea: 500,
      maxArea: 100000000,
      color: "#01FF00",
      label: "> 500m2"
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
    usageValues3:[{
      value: "industriefunctie",
      color: "#E69800",
      label: "Industriefunctie"
    }],
    usageValues4:[{
      value: "kantoorfunctie",
      color: "#E69800",
      label: "Kantoorfunctie"
    }],
    usageValues5:[{
      value: "logiesfunctie",
      color: "#E69800",
      label: "Logiesfunctie"
    }],
    usageValues6:[{
      value: "onderwijsfunctie",
      color: "#E69800",
      label: "Onderwijsfunctie"
    }],
    usageValues7:[{
      value: "winkelfunctie",
      color: "#E69800",
      label: "Winkelfunctie"
    }],
    usageValues8:[{
      value: "kas",
      color: "#E69800",
      label: "Kas"
    }],

  }
});

define([
  "app/config"
], function (
  config
) {

  return {
    applyYearRenderer: function (layer) {

      classBreakInfos = config.yearClasses.map(function (element) {
        return {
          minValue: element.minYear,
          maxValue: element.maxYear,
          symbol: {
            type: "mesh-3d",
            symbolLayers: [{
              type: "fill",
              material: {
                color: element.color,
                colorMixMode: "replace"
              },
            }]
          }
        }
      })

      layer.renderer = {
        type: "class-breaks",
        field: config.yearField,
        defaultSymbol: {
          type: "mesh-3d",
          symbolLayers: [{
            type: "fill",
            material: {
              color: config.noDataColor,
              colorMixMode: "replace"
            },
          }]
        },
        classBreakInfos: classBreakInfos
      }
    },

    applyHeightRenderer: function (layer) {
      layer.renderer = {
        type: "simple",
        symbol: {
          type: "mesh-3d",
          symbolLayers: [{
            type: "fill",
            material: { color: config.noDataColor, colorMixMode: "replace" },
          }]
        },
        visualVariables: {
          type: "color",
          field: config.heightField,
          legendOptions: {
            title: "Height of the buildings"
          },
          stops: config.heightVariable.stops
        }
      }
    },

    applyAreaRenderer: function (layer) {

      classBreakInfos = config.areaClasses.map(function (element) {
        return {
          minValue: element.minArea,
          maxValue: element.maxArea,
          symbol: {
            type: "mesh-3d",
            symbolLayers: [{
              type: "fill",
              material: {
                color: element.color,
                colorMixMode: "replace"
              },
            }]
          }
        }
      })

      layer.renderer = {
        type: "class-breaks",
        field: config.areaField,
        defaultSymbol: {
          type: "mesh-3d",
          symbolLayers: [{
            type: "fill",
            material: {
              color: config.noDataColor,
              colorMixMode: "replace"
            },
          }]
        },
        classBreakInfos: classBreakInfos
      }
    },

    applyUsageRenderer: function(layer){
    	layer.renderer =
    	{
  type: "unique-value",  // autocasts as new UniqueValueRenderer()
  field: "is_bijeenk",
  field2: "is_winkel",
  defaultSymbol: { type: "simple-fill" },  // autocasts as new SimpleFillSymbol()
  uniqueValueInfos: [{
    // All features with value of "North" will be blue
    value: "1,0",
    symbol: {
      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
      color: "blue"
    }
  }, {
    // All features with value of "East" will be green
    value: "0,1",
    symbol: {
      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
      color: "green"
    }
  }, {
    // All features with value of "South" will be red
    value: "South",
    symbol: {
      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
      color: "red"
    }
  }, {
    // All features with value of "West" will be yellow
    value: "West",
    symbol: {
      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
      color: "yellow"
    }
  }]
}; 
    

    applyOriginalTexture: function (layer) {
      layer.renderer = null;
    }
  }

});

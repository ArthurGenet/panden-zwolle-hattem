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
              edges: {
              type: "solid",
              color: [0, 0, 0],
              size: 0.8
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
            edges: {
              type: "solid",
              color: [0, 0, 0],
              size: 0.8
            },
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
              edges: {
              type: "solid",
              color: [0, 0, 0],
              size: 0.8
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

    applyOriginalTexture: function (layer, basic_renderer) {

      layer.renderer = basic_renderer;
    }
  }

});

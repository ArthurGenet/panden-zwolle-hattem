let bdgLayer = null;

function defExpression(date_expression, height_expression, usage_expression){
  def_expression = date_expression+height_expression+usage_expression;
  console.log(def_expression);
  bdgLayer.definitionExpression = def_expression;
}


define([
  "app/config",
  "esri/identity/OAuthInfo",
  "esri/identity/IdentityManager",
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/layers/GraphicsLayer",
  "esri/widgets/Sketch/SketchViewModel",
  "esri/config",
  "esri/core/promiseUtils",
  "app/time",
  "app/statistics",
  "app/renderers",
  "app/charts"
], function (config,
  OAuthInfo,
  esriId,
  WebScene,
  SceneView,
  GraphicsLayer,
  SketchViewModel,
  esriConfig,
  promiseUtils,
  time,
  statistics,
  renderers,
  charts) {

  return {
    init: function () {

      var info = new OAuthInfo({
          // Swap this ID out with a registered application ID
          appId: "nCTVYx63y8WJGjxY",
          // Uncomment the next line and update if using your own portal
          // portalUrl: "https://<host>:<port>/arcgis"
          // Uncomment the next line to prevent the user's signed in state from being shared with other apps on the same domain with the same authNamespace value.
          // authNamespace: "portal_oauth_inline",
          popup: true
        });
        esriId.registerOAuthInfos([info]);


      esriConfig.portalUrl = config.portalUrl;

      
      let bdgLayerView = null;

      const appState = {
        minYear: 0,
        maxYear: null,
        totalCount: null,
        filterGeometry: null,
        features: null
      };
      console.log(config.usageField);
      console.log(config.yearField);
      console.log("mais what");


      const webscene = new WebScene({
        portalItem: {
          id: config.itemId
        }
      });

      const view = new SceneView({
        container: "viewDiv",
        qualityProfile: "high",
        map: webscene
      });

      view.when(function () {
        webscene.allLayers.forEach(layer => {
          console.log(layer.title);
          console.log(config.buildingLayerTitle);
          if (layer.title === config.buildingLayerTitle) {
            console.log("ok");
            console.log(config.heightField);
            bdgLayer = layer;
            bdgLayer.popupTemplate = {
              content: `Dit gebouw is {${config.heightField}}m lang, gebouwd in
              {${config.yearField}} en het heeft een {${config.usageField}}.`
            };
            console.log("ok2");
            //console.log(config.heightField);
            console.log(config.yearField);
            console.log(config.usageField);
            //bdgLayer.outFields = [config.heightField, config.yearField, config.usageField];
            console.log("ok3");
            view.whenLayerView(layer).then(function (lyrView) {
              bdgLayerView = lyrView;
              
              // add time slider
              const timeSlider = time.createTimeSlider(view, config);
              timeSlider.watch("timeExtent", function (timeExtent) {
                appState.maxYear = timeExtent.end.getFullYear();
                updateMap();
              });

              // watch for changes on the layer
              bdgLayerView.watch("updating", function (updating) {
                if (!updating) {
                  console.log("updating");
                  runQuery();
                }
              });
            });
          }
        });
      });

      // add sketch functionality

      const sketchLayer = new GraphicsLayer({
        elevationInfo: {
          mode: "on-the-ground"
        }

      });
      webscene.add(sketchLayer);
      console.log("coucou");
      const sketchViewModel = new SketchViewModel({
        layer: sketchLayer,
        defaultUpdateOptions: {
          tool: "reshape",
          toggleToolOnClick: false
        },
        view: view,
          polygonSymbol: {
            type: "polygon-3d",
            symbolLayers: [
              {
                type: "fill",
                material: {
                  color: [100, 200, 210, 0.6]
                },
                outline: {
                  color: [0, 0, 0, 1],
                  size: "5px"
                }
              }
            ]
          }
      });

      sketchViewModel.on("create", function (event) {
        if (event.state === "complete") {
          appState.filterGeometry = event.graphic.geometry;
          bdgLayerView.filter = {
            geometry: appState.filterGeometry,
            spatialRelationship: "intersects"
          };
          runQuery();
        }
      });

      sketchViewModel.on("update", function (event) {
        if (!event.cancelled && event.graphics.length) {
          appState.filterGeometry = event.graphics[0].geometry;
          bdgLayerView.filter = {
            geometry: appState.filterGeometry,
            spatialRelationship: "intersects"
          };
          runQuery();
        }
      });

      const debouncedRunQuery = promiseUtils.debounce(function () {
        const query = bdgLayerView.createQuery();
        query.geometry = appState.filterGeometry;
        query.outStatistics = statistics.totalStatDefinitions;
        return bdgLayerView.queryFeatures(query).then(charts.updateCharts);
      });

      function runQuery() {
        debouncedRunQuery().catch((error) => {
          if (error.name === "AbortError") {
            return;
          }
          console.error(error);
        });
      }

      document.getElementById("drawPolygon").addEventListener("click", function () {
        sketchViewModel.create("polygon");
      });

      document.getElementById("clearSelection").addEventListener("click", function () {
        appState.filterGeometry = null;
        bdgLayerView.filter = null;
        sketchViewModel.cancel();
        sketchLayer.removeAll();
        runQuery();
      });

      document.getElementById("applyYearRenderer").addEventListener("click", function () {
        renderers.applyYearRenderer(bdgLayer);
      });

      document.getElementById("applyHeightRenderer").addEventListener("click", function () {
        renderers.applyHeightRenderer(bdgLayer);
      });

      document.getElementById("applyUsageRenderer").addEventListener("click", function () {
        renderers.applyUsageRenderer(bdgLayer);
      });

      document.getElementById("clearRenderer").addEventListener("click", function () {
        renderers.applyOriginalTexture(bdgLayer);
      });

      function updateMap() {
        bdgLayer.definitionExpression = `${config.yearField} <= ${appState.maxYear}`;
      }
    }
  }

});


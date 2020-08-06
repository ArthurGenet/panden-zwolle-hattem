define([
  "app/config",
  "esri/identity/OAuthInfo",
  "esri/identity/IdentityManager",
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/layers/GraphicsLayer",
  "esri/widgets/Sketch/SketchViewModel",
  "esri/widgets/Zoom",
  "esri/widgets/NavigationToggle",
  "esri/widgets/Compass",
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
  Zoom,
  NavigationToggle,
  Compass,
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
          appId: "ExC28At1nSTjZjOk",
          // Uncomment the next line and update if using your own portal
          // portalUrl: "https://<host>:<port>/arcgis"
          // Uncomment the next line to prevent the user's signed in state from being shared with other apps on the same domain with the same authNamespace value.
          // authNamespace: "portal_oauth_inline",
          popup: true
        });
        esriId.registerOAuthInfos([info]);

      esriConfig.portalUrl = config.portalUrl;

      let bdgLayer = null;
      let bdgLayerView = null;
      let basic_renderer = null;

      const appState = {
        minYear: 0,
        maxYear: null,
        totalCount: null,
        filterGeometry: null,
        features: null
      };
      
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
          if (layer.title === config.buildingLayerTitle) {
            bdgLayer = layer;
            bdgLayer.outFields = [config.heightField, config.yearField,  config.usageField2,config.usageField3,config.usageField4,config.usageField5,config.usageField6,config.usageField7,config.usageField8, config.areaField, config.usageField1];
            basic_renderer = bdgLayer.renderer;
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
                console.log("updating");
                runQuery();
                addChartEventListeners();
              });
            });
          }
        });
      });

      var def_expression_date = "1=1 ";
      var def_expression_height = "AND 1=1 ";
      var def_expression_usage = "AND 1=1";
      var def_expression_area = "AND 1=1 ";


      var click_year = false;
      var click_height = false;
      var click_usage = false;
      var click_area = false;


      function addChartEventListeners() {

        charts.usageCanvas.onclick = function(evt)
        {   
          if (click_usage == false){

            click_usage = true;
            var activePoints = charts.usageChart.getElementsAtEvent(evt);
            var clickedElementindex = activePoints[0]["_index"];
            var label = charts.usageChart.data.labels[clickedElementindex];

            if (label == "Andere"){
              def_expression_usage = "AND is_bijeenk = 0 AND is_gezondh = 0 AND is_industr = 0 AND is_kantoor = 0 AND is_logies = 0 AND is_onderwi = 0 AND is_winkel = 0 AND is_kas = 0";
            }
            else{
              var index = 7
             if(label.toLowerCase().charAt(6) == "f"){
               index = 6;
             }
              def_expression_usage = "AND is_" + label.toLowerCase().substring(0,index) + " = 1";
            }
          }

          else {
            click_usage = false;
            def_expression_usage = "AND 1=1";
          }
          

          defExpression(def_expression_date,def_expression_height,def_expression_usage);  
        }


        charts.heightCanvas.onclick = function(evt) {   
          if (click_height == false){

            click_height = true;
            var activePoints = charts.heightChart.getElementsAtEvent(evt);
            var clickedElementindex = activePoints[0]["_index"];
            var label = charts.heightChart.data.labels[clickedElementindex];
            var heights = label.split(" ");
            
            
            if (heights[2] != null) {
              var start_height = heights[0];
              var end_height = heights[2].substring(0, heights[2].lastIndexOf("m"));

              def_expression_height = "AND hoogte >= " + start_height + " AND hoogte < " + end_height + " ";
            }

            else {
              var height = heights[1].substring(0, heights[1].lastIndexOf("m"));
              def_expression_height = "AND hoogte " + heights[0] + " " + height + " ";
            }
              
            
          }
            
          else{
            click_height = false;
            def_expression_height = "AND 1=1 ";
          }
          

          defExpression(def_expression_date,def_expression_height,def_expression_usage);  
        }



        charts.yearCanvas.onclick = function(evt) {   

          if (click_year == false){

            click_year = true;
            var activePoints = charts.yearChart.getElementsAtEvent(evt);
            var clickedElementindex = activePoints[0]["_index"];
            var label = charts.yearChart.data.labels[clickedElementindex];
            var dates = label.split(" ");
            
            
            if (dates[2] != null) {
              var start_date = dates[0];
              var end_date = dates[2];
              def_expression_date = "bouwjaar >= " + start_date + " AND bouwjaar < " + end_date + " ";
            }
            else {
              var date = dates[0].substring(dates[0].lastIndexOf("<") + 1, dates[0].length);
              def_expression_date = "bouwjaar < " + date + " ";
            }
          }
            
          else{
            click_year = false;
            def_expression_date = "1=1 ";
          }
          

          defExpression(def_expression_date,def_expression_height,def_expression_usage);  
        }

        charts.areaCanvas.onclick = function(evt) 
        {   
          if (click_area == false){

            click_area = true;
            var activePoints = charts.areaChart.getElementsAtEvent(evt);
            var clickedElementindex = activePoints[0]["_index"];
            var label = charts.areaChart.data.labels[clickedElementindex];
            var areas = label.split(" ");
            
            
            if (areas[2] != null) {
              var start_area = areas[0];
              var end_area = areas[2].substring(0, areas[2].lastIndexOf("m2"));

              def_expression_area = "AND oppervlak >= " + start_area + " AND oppervlak < " + end_area + " ";
            }

            else {
              var area = areas[1].substring(0, areas[1].lastIndexOf("m2"));
              def_expression_area = "AND oppervlak " + areas[0] + " " + area + " ";
            }
              
            
          }
            
          else{
            click_area = false;
            def_expression_area = "AND 1=1 ";
          }
          
          defExpression(def_expression_date,def_expression_height,def_expression_area,def_expression_usage);  
        }
      }

      function defExpression(date_expression, height_expression, area_expression, usage_expression){
        def_expression = date_expression+height_expression+area_expression+usage_expression;
        console.log(def_expression);
        bdgLayer.definitionExpression = def_expression;
      }



      view.ui.remove([ "compass", "navigation-toggle", "zoom" ]);

      var zoomWidget = new Zoom({
        view: view,
        container: "zoomWidget"
      });
      var navigationWidget = new NavigationToggle({
        view: view,
        container: "toggleWidget"
      });
      var compassWidget = new Compass({
        view: view,
        container: "compassWidget"
      });
      

      // add sketch functionality

      const sketchLayer = new GraphicsLayer({
        elevationInfo: {
          mode: "on-the-ground"
        }
      });
      webscene.add(sketchLayer);

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

      document.getElementById("applyAreaRenderer").addEventListener("click", function () {
        renderers.applyAreaRenderer(bdgLayer);
      });

      document.getElementById("clearRenderer").addEventListener("click", function () {
        renderers.applyOriginalTexture(bdgLayer, basic_renderer);
      });

      function updateMap() {
        bdgLayer.definitionExpression = `${config.yearField} <= ${appState.maxYear}`;
      }
    }
  }
});

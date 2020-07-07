define(["app/config", "app/utils", "app/statistics", "app/main"], function (config, appUtils, statistics) {
  
  Chart.defaults.global.defaultFontFamily = `"Avenir Next W00","Helvetica Neue",Helvetica,Arial,sans-serif`;
  Chart.defaults.global.defaultFontSize = 12;

  var def_expression_date = "1=1 ";
  var def_expression_height = "AND 1=1 ";
  var def_expression_area = "AND 1=1 ";
  var def_expression_usage = "AND 1=1";

  var click_year = false;
  var click_height = false;
  var click_area = false;
  var click_usage = false;

  function createYearChart() {
    const yearCanvas = document.getElementById("yearChart");
    const yearChart = new Chart(yearCanvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: config.yearClasses.map(function (element) { return element.label }),
        datasets: [
          {
            label: "Buildings built",
            backgroundColor: config.yearClasses.map(function (element) { return element.color }),
            stack: "Stack 0",
            data: [0, 0, 0, 0, 0, 0]
          }
        ]
      },
      options: {
        responsive: false,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "Number of buildings by construction year"
        },
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
                precision: 0
              }
            }
          ]
        }
      }
    });

    yearCanvas.onclick = function(evt) {   

      if (click_year == false){

        click_year = true;
        var activePoints = yearChart.getElementsAtEvent(evt);
        var clickedElementindex = activePoints[0]["_index"];
        var label = yearChart.data.labels[clickedElementindex];
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
      

      defExpression(def_expression_date,def_expression_height,def_expression_area,def_expression_usage);  
    }

    return yearChart;

  }
  function createHeightChart() {
    const heightCanvas = document.getElementById("heightChart");
    const heightBins = appUtils.heightBins;
    const heightChart = new Chart(heightCanvas.getContext("2d"), {
      type: "horizontalBar",
      data: {
        labels: heightBins.map(function (element) { return element.label }),
        datasets: [
          {
            label: "Buildings with this height",
            backgroundColor: heightBins.map(function (element) { return element.color }),
            data: [0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      },
      options: {
        responsive: false,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "Number of buildings by height"
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
                precision: 0
              }
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    });

    heightCanvas.onclick = function(evt) {   
      if (click_height == false){

        click_height = true;
        var activePoints = heightChart.getElementsAtEvent(evt);
        var clickedElementindex = activePoints[0]["_index"];
        var label = heightChart.data.labels[clickedElementindex];
        var heights = label.split(" ");
        
        
        if (heights[2] != null) {
          var start_height = heights[0];
          var end_height = heights[2].substring(0, heights[2].lastIndexOf("m"));

          def_expression_height = "AND MAX_hoogte >= " + start_height + " AND MAX_hoogte < " + end_height + " ";
        }

        else {
          var height = heights[1].substring(0, heights[1].lastIndexOf("m"));
          def_expression_height = "AND MAX_hoogte " + heights[0] + " " + height + " ";
        }
          
        
      }
        
      else{
        click_height = false;
        def_expression_height = "AND 1=1 ";
      }
      

      defExpression(def_expression_date,def_expression_height,def_expression_area,def_expression_usage);  
    }
    return heightChart;
  }



  function createAreaChart() {
    const areaCanvas = document.getElementById("areaChart");
    const areaChart = new Chart(areaCanvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: config.areaClasses.map(function (element) { return element.label }),
        datasets: [
          {
            label: "Buildings built",
            backgroundColor: config.areaClasses.map(function (element) { return element.color }),
            stack: "Stack 0",
            data: [0, 0, 0, 0, 0, 0]
          }
        ]
      },
      options: {
        responsive: false,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "Number of buildings by area"
        },
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
                precision: 0
              }
            }
          ]
        }
      }
    });

      areaCanvas.onclick = function(evt) {   
      if (click_area == false){

        click_area = true;
        var activePoints = areaChart.getElementsAtEvent(evt);
        var clickedElementindex = activePoints[0]["_index"];
        var label = areaChart.data.labels[clickedElementindex];
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

    return areaChart;
  }


function createUsageChart() {

    const labels = ["Bijeenkomstfunctie","Gezondheidszorgfunctie","Industriefunctie","Kantoorfunctie","Logiesfunctie","Onderwijsfunctie","Winkelfunctie","Kas","Andere"];

    const backgroundColor = ["#00FFC5","#E69800","#B53535","#8400A8","#376CBD","#E600A9","#FFFF00","#734C00","#FFB55A"] ;   


    const usageCanvas = document.getElementById("usageChart");
    const usageChart = new Chart(usageCanvas.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            backgroundColor: backgroundColor,
            borderWidth: 0,
            data: [0, 0, 0, 0, 0]
          }
        ]
      },
      options: {
        responsive: false,
        cutoutPercentage: 35,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "Building usage"
        }
      }
    });
    usageCanvas.onclick = function(evt)

    {   
      if (click_usage == false){

        click_usage = true;
        var activePoints = usageChart.getElementsAtEvent(evt);
        var clickedElementindex = activePoints[0]["_index"];
        var label = usageChart.data.labels[clickedElementindex];

        if (label == "Andere"){
          def_expression_usage = "AND Gebruiksfunctie IS NULL ";
        }
        else{
          var index = 7
     	  if(label.toLowerCase()[7] == "f"){
     	  	index = 6;
     	  }
          def_expression_usage = "AND is_" + label.toLowerCase().substring(0,index) + " = 1";
        }
      }

      else {
        click_usage = false;
        def_expression_usage = "AND 1=1";
      }
      

      defExpression(def_expression_date,def_expression_height,def_expression_area,def_expression_usage);  
    }

    return usageChart;
  }




  const yearChart = createYearChart();
  const heightChart = createHeightChart();
  const areaChart = createAreaChart();
  const usageChart = createUsageChart();


  return {
    yearChart,
    heightChart,
    areaChart,
    usageChart,
    updateCharts(result) {
      const allStats = result.features[0].attributes;

      const yearValues = statistics.yearStatDefinitions.map(function (element) {
        return allStats[element.outStatisticFieldName]
      });
      yearChart.data.datasets[0].data = yearValues;
      yearChart.update();

      const heightValues = statistics.heightStatDefinitions.map(function (element) {
        return allStats[element.outStatisticFieldName]
      });
      heightChart.data.datasets[0].data = heightValues;
      heightChart.update();

      const areaValues = statistics.areaStatDefinitions.map(function (element) {
        return allStats[element.outStatisticFieldName]
      });
      areaChart.data.datasets[0].data = areaValues;
      areaChart.update();

      const usageValues1 = statistics.usage1StatDefinitions.map(function (element) {
        return allStats[element.outStatisticFieldName]
      });

      const usageValues2 = statistics.usage2StatDefinitions.map(function (element) {
        return allStats[element.outStatisticFieldName]
      });
      const usageValues3 = statistics.usage3StatDefinitions.map(function (element) {
        return allStats[element.outStatisticFieldName]
      });
      const usageValues4 = statistics.usage4StatDefinitions.map(function (element) {
        return allStats[element.outStatisticFieldName]
      });
      const usageValues5 = statistics.usage5StatDefinitions.map(function (element) {
        return allStats[element.outStatisticFieldName]
      });
      const usageValues6 = statistics.usage6StatDefinitions.map(function (element) {
        return allStats[element.outStatisticFieldName]
      });
      const usageValues7 = statistics.usage7StatDefinitions.map(function (element) {
        return allStats[element.outStatisticFieldName]
      });
      const usageValues8 = statistics.usage8StatDefinitions.map(function (element) {
        return allStats[element.outStatisticFieldName]
      });
      const usageValuesOther = statistics.usageOtherStatDefinitions.map(function (element) {
        return allStats[element.outStatisticFieldName]
      });
      console.log(usageValues1);
      console.log(usageValues2);
      console.log(usageValues3);
      console.log(usageValues4);
      console.log(usageValues5);
      console.log(usageValues6);
      console.log(usageValues7);
      console.log(usageValues8);
      console.log(usageValuesOther);
      usageChart.data.datasets[0].data = [usageValues1,usageValues2,usageValues3,usageValues4,usageValues5,usageValues6,usageValues7,usageValues8,usageValuesOther];
      usageChart.update();

    }
  }
});

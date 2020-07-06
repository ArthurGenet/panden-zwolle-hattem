define(["app/config", "app/utils", "app/statistics"], function (config, appUtils, statistics) {
  Chart.defaults.global.defaultFontFamily = `"Avenir Next W00","Helvetica Neue",Helvetica,Arial,sans-serif`;
  Chart.defaults.global.defaultFontSize = 12;
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
    return yearChart;
  }
  function createHeightChart() {
    const heightCanvas = document.getElementById("heightChart");
    const heightBins = appUtils.heightBins;
    return new Chart(heightCanvas.getContext("2d"), {
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
    return areaChart;
  }

function createUsageChart() {

    const labels = ["Bijeenkomstfunctie","Gezondheidszorgfunctie","Industriefunctie","Kantoorfunctie","Logiesfunctie","Onderwijsfunctie","Winkelfunctie","Kas"];
    //labels.push("Other");

    const backgroundColor = ["#00FFC5","#E69800","#E69800","#E69800","#E69800","#E69800","#E69800","#E69800"]    

    backgroundColor.push(config.otherColor);

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
          position: "bottom"
        },
        title: {
          display: true,
          text: "Building usage"
        }
      }
    });
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
      console.log(usageValues1);
      console.log(usageValues2);
      console.log(usageValues3);
      console.log(usageValues4);
      console.log(usageValues5);
      console.log(usageValues6);
      console.log(usageValues7);
      console.log(usageValues8);
      usageChart.data.datasets[0].data = [usageValues1,usageValues2,usageValues3,usageValues4,usageValues5,usageValues6,usageValues7,usageValues8];
      usageChart.update();

    }
  }
});

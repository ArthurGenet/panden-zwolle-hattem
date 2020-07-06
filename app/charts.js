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


  const yearChart = createYearChart();
  const heightChart = createHeightChart();
  const areaChart = createAreaChart();
  return {
    yearChart,
    heightChart,
    areaChart,
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

      const usageValues1 = statistics.usageStatDefinitions1.map(function (element) {
        return allStats[element.outStatisticFieldName]
      });

      const usageValues2 = statistics.usageStatDefinitions2.map(function (element) {
        return allStats[element.outStatisticFieldName]
      });
      console.log(usageValues1);
      console.log(usageValues2);
    }
  }
});

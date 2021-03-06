define(["app/config", "app/utils", "app/statistics", "app/main"], function (config, appUtils, statistics) {
  
  Chart.defaults.global.defaultFontFamily = `"Avenir Next W00","Helvetica Neue",Helvetica,Arial,sans-serif`;
  Chart.defaults.global.defaultFontSize = 12;

  
  const yearCanvas = document.getElementById("yearChart");

  function createYearChart() {
    const yearChart = new Chart(yearCanvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: config.yearClasses.map(function (element) { return element.label }),
        datasets: [
          {
            label: "Gebouwde gebouwen",
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
          text: "Bouwjaar"
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


  const heightCanvas = document.getElementById("heightChart");

  function createHeightChart() {
    const heightBins = appUtils.heightBins;
    const heightChart = new Chart(heightCanvas.getContext("2d"), {
      type: "horizontalBar",
      data: {
        labels: heightBins.map(function (element) { return element.label }),
        datasets: [
          {
            label: "Gebouwen met deze hoogte",
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
          text: "Hoogte"
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

    return heightChart;
  }


  const areaCanvas = document.getElementById("areaChart");

  function createAreaChart() {
    const areaChart = new Chart(areaCanvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: config.areaClasses.map(function (element) { return element.label }),
        datasets: [
          {
            label: "Gebouwen met deze oppervlakte",
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
          text: "Oppervlakte"
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


  const usageCanvas = document.getElementById("usageChart");

  function createUsageChart() {

    const labels = ["Bijeenkomstfunctie","Gezondheidszorgfunctie","Industriefunctie","Kantoorfunctie","Logiesfunctie","Onderwijsfunctie","Winkelfunctie","Kas"];

    const backgroundColor = ["#00FFC5","#E69800","#B53535","#8400A8","#376CBD","#E600A9","#FFFF00","#734C00"] ;   


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
          fontSize: 15,
          text: "Gebruiksfunctie gebouw"
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
    yearCanvas,
    heightCanvas,
    areaCanvas,
    usageCanvas,

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

      usageChart.data.datasets[0].data = [usageValues1,usageValues2,usageValues3,usageValues4,usageValues5,usageValues6,usageValues7,usageValues8];
      usageChart.update();

    }
  }
});

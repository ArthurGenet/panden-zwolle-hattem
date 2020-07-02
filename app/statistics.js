define(["app/config", "app/utils"], function (config, appUtils) {

  function generateHeightStatistics() {
    const heightBins = appUtils.heightBins;
    return heightBins.map(function (element) {
      return {
        onStatisticField:
          element.statsField,
        outStatisticFieldName: element.fieldName,
        statisticType: "sum"
      }
    })
  }
  const heightStatDefinitions = generateHeightStatistics();
  console.log(heightStatDefinitions);
  console.log(typeof heightStatDefinitions);

  function generateYearStatistics() {
    return config.yearClasses.map(function (element) {
      const min = element.minYear;
      const max = element.maxYear;

      return {
        onStatisticField:
          `CASE WHEN (${config.yearField} >= ${min} AND ${config.yearField} < ${max}) THEN 1 ELSE 0 END`,
        outStatisticFieldName: `year_${min}_${max}`,
        statisticType: "sum"
      }
    });
  }
  const yearStatDefinitions = generateYearStatistics();
  console.log(yearStatDefinitions);
  console.log(typeof yearStatDefinitions);

  function generateUsageStatistics() {
    const types = [];
    var index = -1;
    console.log("ici");
    var usageStats = config.usageValues[0].map(function (element) {
      types.push(element.value);
      index+=1
      console.log(index);
      console.log(config.usageField);
      console.log(config.usageField.length);
      console.log(element);

      console.log(config.usageField[0]);
      return {
        onStatisticField:
          config.usageField[0],
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      }
    });
var usageStats2 = config.usageValues[1].map(function (element) {
      types.push(element.value);
      return {
        onStatisticField:
          config.usageField[1],
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      }
    });
var usageStats3 = config.usageValues[2].map(function (element) {
      types.push(element.value);
      return {
        onStatisticField:
          config.usageField[2],
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      }
    });
var usageStats4 = config.usageValues[3].map(function (element) {
      types.push(element.value);
      return {
        onStatisticField:
          config.usageField[3],
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      }
    });
var usageStats5 = config.usageValues[4].map(function (element) {
      types.push(element.value);
      return {
        onStatisticField:
          config.usageField[4],
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      }
    });
var usageStats6 = config.usageValues[5].map(function (element) {
      types.push(element.value);
      return {
        onStatisticField:
          config.usageField[5],
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      }
    });
var usageStats7 = config.usageValues[6].map(function (element) {
      types.push(element.value);
      return {
        onStatisticField:
          config.usageField[6],
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      }
    });
var usageStats8 = config.usageValues[7].map(function (element) {
      types.push(element.value);
      return {
        onStatisticField:
          config.usageField[7],
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      }
    });
usageStats.push(usageStats2);
usageStats.push(usageStats3);
usageStats.push(usageStats4);
usageStats.push(usageStats5);
usageStats.push(usageStats6);
usageStats.push(usageStats7);
	usageStats.push(usageStats8);
	
    const otherStats = {
      onStatisticField:
        `CASE WHEN (${config.usageField[0]} =1 OR ${config.usageField[1]} =1 OR ${config.usageField[2]} =1 OR ${config.usageField[3]} =1 OR ${config.usageField[4]} =1 OR ${config.usageField[5]} =1 OR ${config.usageField[6]} =1 OR ${config.usageField[7]} =1) THEN 0 ELSE 1 END`,
      outStatisticFieldName: "usage_other",
      statisticType: "sum"
    };
    
    
    usageStats.push(otherStats);

    console.log(usageStats);

   
    return usageStats;
  }

  const usageStatDefinitions = generateUsageStatistics();
  console.log(typeof usageStatDefinitions);
  console.log(usageStatDefinitions);

  return {
    heightStatDefinitions,
    yearStatDefinitions,
    usageStatDefinitions,
    totalStatDefinitions: heightStatDefinitions.concat(yearStatDefinitions).concat(usageStatDefinitions)
  };
});

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

  function generateAreaStatistics() {
    return config.areaClasses.map(function (element) {
      const min = element.minArea;
      const max = element.maxArea;

      return {
        onStatisticField:
          `CASE WHEN (${config.areaField} >= ${min} AND ${config.areaField} < ${max}) THEN 1 ELSE 0 END`,
        outStatisticFieldName: `area_${min}_${max}`,
        statisticType: "sum"
      }
    });
  }
  const areaStatDefinitions = generateAreaStatistics();
  console.log(areaStatDefinitions);

  function generateUsageStatistics() {
    const types = [];
    const usageStats = config.usageValues.map(function (element) {
      return {
        onStatisticField:
          `CASE WHEN ${config.usageField} = 1 THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      }
    });

    const usageStats2 = config.usageValues2.map(function (element) {
      return {
        onStatisticField:
          `CASE WHEN ${config.usageField2} = 1 THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      }
    });
	usageStats.push(usageStats2);


    const otherStats = {
      onStatisticField:
        `CASE WHEN ${config.usageField} IN ('${types.join("', '")}') THEN 0 ELSE 1 END`,
      outStatisticFieldName: "usage_other",
      statisticType: "sum"
    }
    usageStats.push(otherStats);
    return usageStats;
  }


  function generateUsage1Statistics() {
    return config.usageValues1.map(function (element) {
    	console.log("usage1");
      const usage = element.value;

      return {
        onStatisticField:
          `CASE WHEN (${config.usageField1} = 1) THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${usage}`,
        statisticType: "sum"
      }
    });
  } 
	
  //const usage1StatDefinitions = generateUsage1Statistics();
  //console.log(usage1StatDefinitions);

  function generateUsage2Statistics() {
    return config.usageValues2.map(function (element) {
      const usage = element.value;
      return {
        onStatisticField:
          `CASE WHEN (${config.usageField2} = 1) THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${usage}`,
        statisticType: "sum"
      }
    });
  } 
	
  //const usage2StatDefinitions = generateUsage2Statistics();
  //console.log(usage2StatDefinitions);

  //const usageStatDefinitions = generateUsageStatistics();

  return {
    heightStatDefinitions,
    yearStatDefinitions,
    areaStatDefinitions,
    
    //usageStatDefinitions,
    //totalStatDefinitions: heightStatDefinitions.concat(yearStatDefinitions).concat(usageStatDefinitions)
    totalStatDefinitions: yearStatDefinitions.concat(heightStatDefinitions).concat(areaStatDefinitions)
  };
});

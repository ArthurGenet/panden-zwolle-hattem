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

  function generateUsage1Statistics() {
    return config.usageValues1.map(function (element) {
      const usage = element.value;

      return {
        onStatisticField:
          `CASE WHEN (${config.usageField1} = 1) THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${usage}`,
        statisticType: "sum"
      }
    });
  } 
	
  const usage1StatDefinitions = generateUsage1Statistics();

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
	
  const usage2StatDefinitions = generateUsage2Statistics();

  return {
    heightStatDefinitions,
    yearStatDefinitions,
    areaStatDefinitions,
    usage1StatDefinitions,
    usage2StatDefinitions,
    totalStatDefinitions: heightStatDefinitions.concat(yearStatDefinitions).concat(areaStatDefinitions).concat(usage1StatDefinitions).concat(usage2StatDefinitions)
  };
});

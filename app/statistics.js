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
  //const areaStatDefinitions = generateAreaStatistics();



  return {
    heightStatDefinitions,
    yearStatDefinitions,
    //areaStatDefinitions,
    totalStatDefinitions: heightStatDefinitions.concat(yearStatDefinitions)//.concat(areaStatDefinitions)
  };
});

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

    function generateUsage3Statistics() {
    return config.usageValues3.map(function (element) {
      const usage = element.value;
      return {
        onStatisticField:
          `CASE WHEN (${config.usageField3} = 1) THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${usage}`,
        statisticType: "sum"
      }
    });
  } 
	
  const usage3StatDefinitions = generateUsage3Statistics();



    function generateUsage4Statistics() {
    return config.usageValues4.map(function (element) {
      const usage = element.value;
      return {
        onStatisticField:
          `CASE WHEN (${config.usageField4} = 1) THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${usage}`,
        statisticType: "sum"
      }
    });
  } 
	
  const usage4StatDefinitions = generateUsage4Statistics();

    function generateUsage5Statistics() {
    return config.usageValues5.map(function (element) {
      const usage = element.value;
      return {
        onStatisticField:
          `CASE WHEN (${config.usageField5} = 1) THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${usage}`,
        statisticType: "sum"
      }
    });
  } 
	
  const usage5StatDefinitions = generateUsage5Statistics();

    function generateUsage6Statistics() {
    return config.usageValues6.map(function (element) {
      const usage = element.value;
      return {
        onStatisticField:
          `CASE WHEN (${config.usageField6} = 1) THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${usage}`,
        statisticType: "sum"
      }
    });
  } 
	
  const usage6StatDefinitions = generateUsage6Statistics();

    function generateUsage7Statistics() {
    return config.usageValues7.map(function (element) {
      const usage = element.value;
      return {
        onStatisticField:
          `CASE WHEN (${config.usageField7} = 1) THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${usage}`,
        statisticType: "sum"
      }
    });
  } 
	
  const usage7StatDefinitions = generateUsage7Statistics();

    function generateUsage8Statistics() {
    return config.usageValues8.map(function (element) {
      const usage = element.value;
      return {
        onStatisticField:
          `CASE WHEN (${config.usageField8} = 1) THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${usage}`,
        statisticType: "sum"
      }
    });
  } 
	
  const usage8StatDefinitions = generateUsage8Statistics();

  return {
    heightStatDefinitions,
    yearStatDefinitions,
    areaStatDefinitions,
    usage1StatDefinitions,
    usage2StatDefinitions,
    usage3StatDefinitions,
    usage4StatDefinitions,
    usage5StatDefinitions,
    usage6StatDefinitions,
    usage7StatDefinitions,
    usage8StatDefinitions,
    totalStatDefinitions: heightStatDefinitions.concat(yearStatDefinitions).concat(areaStatDefinitions).concat(usage1StatDefinitions).concat(usage2StatDefinitions).concat(usage3StatDefinitions).concat(usage4StatDefinitions).concat(usage5StatDefinitions).concat(usage6StatDefinitions).concat(usage7StatDefinitions).concat(usage8StatDefinitions)
  };
});

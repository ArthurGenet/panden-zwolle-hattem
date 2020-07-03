define(["app/config", "app/utils", "app/main"], function (config, appUtils) {

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
    const usageStats = config.usageValues.map(function (element) {
      types.push(element.value);
      
      return {
        onStatisticField: `CASE WHEN (${config.yearField} >= 1000 AND ${config.yearField} < 2000) THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      }
    });
    

    console.log(types);


    const statDefinitions = config.usageField.map(function(fieldName) {
            return {
              onStatisticField: 'CASE WHEN '+fieldName+' = 1 THEN 0 ELSE 1 END',
              outStatisticFieldName: "usage_"+fieldName ,
              statisticType: "sum"
            };
          });
	//usageStats.push(usageStats2);

    const otherStats = {
      onStatisticField:
        `CASE WHEN (${config.usageField[0]} =1 OR ${config.usageField[1]} =1 OR ${config.usageField[2]} =1 OR ${config.usageField[3]} =1 OR ${config.usageField[4]} =1 OR ${config.usageField[5]} =1 OR ${config.usageField[6]} =1 OR ${config.usageField[7]} =1) THEN 1 ELSE 0 END`,
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

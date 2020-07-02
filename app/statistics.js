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

  function generateUsageStatistics() {
    const types = [];
    var index = -1;
    console.log("ici");
    var usageStats = config.usageValues.map(function (element) {
      types.push(element.value);
      index+=1
      console.log(index);
      console.log(config.usageField);
      console.log(config.usageField.length);

      console.log(config.usageField[0]);
      return {
        onStatisticField:
          `CASE WHEN (${config.usageField[index]} = 1) THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      }
    });
    
	usageStats
    const otherStats = {
      onStatisticField:
        `CASE WHEN ${config.usageField[0]} =1 OR ${config.usageField[1]} =1 OR ${config.usageField[2]} =1 OR ${config.usageField[3]} =1 OR ${config.usageField[4]} =1 OR ${config.usageField[5]} =1 OR ${config.usageField[6]} =1 OR ${config.usageField[7]} =1 THEN 0 ELSE 1 END`,
      outStatisticFieldName: "usage_other",
      statisticType: "sum"
    }
    usageStats.push(otherStats);
    console.log(usageStats);
    usageStats = [{onStatisticField: "CASE WHEN (is_bijeenk = 1) THEN 1 ELSE 0 END", outStatisticFieldName: "usage_bijeenkomstfunctie", statisticType: "sum"},{onStatisticField: "CASE WHEN (is_gezondh = 1) THEN 1 ELSE 0 END", outStatisticFieldName: "usage_gezondheidszorgfunctie", statisticType: "sum"},{onStatisticField: "CASE WHEN (is_industr = 1) THEN 1 ELSE 0 END", outStatisticFieldName: "usage_industriefunctie", statisticType: "sum"},{onStatisticField: "CASE WHEN (is_kantoor = 1) THEN 1 ELSE 0 END", outStatisticFieldName: "usage_kantoorfunctie", statisticType: "sum"},{onStatisticField: "CASE WHEN (is_logies = 1) THEN 1 ELSE 0 END", outStatisticFieldName: "usage_logiesfunctie", statisticType: "sum"},{onStatisticField: "CASE WHEN (is_onderwi = 1) THEN 1 ELSE 0 END", outStatisticFieldName: "usage_onderwijsfunctie", statisticType: "sum"},{onStatisticField: "CASE WHEN (is_winkel = 1) THEN 1 ELSE 0 END", outStatisticFieldName: "usage_winkelfunctie", statisticType: "sum"},{onStatisticField: "CASE WHEN (is_kas = 1) THEN 1 ELSE 0 END", outStatisticFieldName: "usage_kas", statisticType: "sum"},{
      onStatisticField:
        `CASE WHEN ${config.usageField[0]} =1 OR ${config.usageField[1]} =1 OR ${config.usageField[2]} =1 OR ${config.usageField[3]} =1 OR ${config.usageField[4]} =1 OR ${config.usageField[5]} =1 OR ${config.usageField[6]} =1 OR ${config.usageField[7]} =1 THEN 0 ELSE 1 END`,
      outStatisticFieldName: "usage_other",
      statisticType: "sum"
    }];
    console.log(usageStats);
    return usageStats;
  }

  const usageStatDefinitions = generateUsageStatistics();

  return {
    heightStatDefinitions,
    yearStatDefinitions,
    usageStatDefinitions,
    totalStatDefinitions: heightStatDefinitions.concat(yearStatDefinitions).concat(usageStatDefinitions)
  };
});

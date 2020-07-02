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
          `CASE WHEN (${String(config.usageField[index])} LIKE '1') THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      }
    });


    const usageSt =[];
    const a = {
        onStatisticField:
          `CASE WHEN (${String(config.usageField[0])} LIKE '1') THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      };
    const b = {
        onStatisticField:
          `CASE WHEN (${String(config.usageField[1])} LIKE '1') THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      };

    const c = {
        onStatisticField:
          `CASE WHEN (${String(config.usageField[2])} LIKE '1') THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      };
    const d = {
        onStatisticField:
          `CASE WHEN (${String(config.usageField[3])} LIKE '1') THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      };
    const e = {
        onStatisticField:
          `CASE WHEN (${String(config.usageField[4])} LIKE '1') THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      };
    const f = {
        onStatisticField:
          `CASE WHEN (${String(config.usageField[5])} LIKE '1') THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      };
    const g = {
        onStatisticField:
          `CASE WHEN (${String(config.usageField[6])} LIKE '1') THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      };
    const h = {
        onStatisticField:
          `CASE WHEN (${String(config.usageField[7])} LIKE '1') THEN 1 ELSE 0 END`,
        outStatisticFieldName: `usage_${element.value}`,
        statisticType: "sum"
      };
	
    const otherStats = {
      onStatisticField:
        `CASE WHEN ${String(config.usageField[0])} =1 OR ${String(config.usageField[1])} =1 OR ${String(config.usageField[2])} =1 OR ${String(config.usageField[3])} =1 OR ${String(config.usageField[4])} =1 OR ${String(config.usageField[5])} =1 OR ${String(config.usageField[6])} =1 OR ${String(config.usageField[7])} =1 THEN 0 ELSE 1 END`,
      outStatisticFieldName: "usage_other",
      statisticType: "sum"
    };
    usageStats.push(a);
    usageStats.push(b);
    usageStats.push(c);
    usageStats.push(d);
    usageStats.push(e);
    usageStats.push(f);
    usageStats.push(g);
    usageStats.push(h);
    
    usageStats.push(otherStats);

    console.log(usageStats);

   
    return usageSt;
  }

  const usageStatDefinitions = generateUsageStatistics();

  return {
    heightStatDefinitions,
    yearStatDefinitions,
    usageStatDefinitions,
    totalStatDefinitions: heightStatDefinitions.concat(yearStatDefinitions).concat(usageStatDefinitions)
  };
});

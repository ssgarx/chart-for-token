export function isEmpty(value: Record<string, any> | any[]): boolean {
  if (Array.isArray(value)) {
    return value.length === 0
  } else if (value && typeof value === "object") {
    return Object.keys(value).length === 0
  }
  return true
}

export function tokenDataTransformer(data: Record<string, any>) {
  let totalValue = 0
  let maxValue = -Infinity
  let minValue = Infinity
  let itemCount = 0
  const series = []

  // Process each series and update metrics in a single loop
  for (const [key, value] of Object.entries(data)) {
    const seriesData = value.series.map(({ time, value }: any) => {
      totalValue += value
      maxValue = Math.max(maxValue, value)
      minValue = Math.min(minValue, value)
      itemCount++
      return [time * 1000, value] // Convert time to milliseconds and return the modified item
    })

    series.push({ name: key, data: seriesData })
  }

  const averagePrice = itemCount > 0 ? totalValue / itemCount : 0

  const highChartsDataConfig = {
    chart: { type: "line" },
    title: { text: undefined },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: { month: "%e. %b", year: "%b" },
      title: { text: "Date" },
      gridLineWidth: 0,
    },
    yAxis: {
      title: { text: "Value in $" },
      gridLineWidth: 0,
      lineWidth: 1,
    },
    tooltip: {
      headerFormat: "<b>{series.name}</b><br>",
      pointFormat: "{point.x:%e %b}, ${point.y:2f}",
    },
    series,
  }

  return {
    highChartsDataConfig,
    averagePrice,
    maxValue,
    minValue,
  }
}

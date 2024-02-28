import ChartEmptyState from "@/components/chartEmptyState"
import ChartSkeleton from "@/components/chartSkeleton"
import CountItUp from "@/components/countItUp"
import { isEmpty } from "@/utils"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

type Props = {
  chartConfig: object | null
  averagePrice: number | null
  maxValue: number | null
  minValue: number | null
}

export default function Chart({
  chartConfig,
  averagePrice,
  maxValue,
  minValue,
}: Props) {
  return (
    <div className="flex flex-col h-full md:w-full shrink min-w-0 items-center justify-center">
      {!chartConfig ? (
        <ChartSkeleton />
      ) : isEmpty(chartConfig) ? (
        <ChartEmptyState />
      ) : (
        <div className="flex flex-col-reverse md:block flex-shrink w-full h-96 md:h-auto">
          <div className="flex justify-evenly md:justify-end items-center gap-8  p-2 md:p-0">
            {renderStats("Average", averagePrice)}
            {renderStats("Maximum", maxValue)}
            {renderStats("Minimum", minValue)}
          </div>
          <HighchartsReact highcharts={Highcharts} options={chartConfig} />
        </div>
      )}
    </div>
  )

  // RENDER HELPERS
  function renderStats(title: string, value: any) {
    return (
      <div>
        <div className="text-zinc-700 text-xs md:text-sm">{title}</div>
        <div className="text-zinc-900 text-base md:text-lg ">
          {typeof value == "number" ? (
            <CountItUp decimals={2}>{value}</CountItUp>
          ) : (
            "-"
          )}
        </div>
      </div>
    )
  }
}

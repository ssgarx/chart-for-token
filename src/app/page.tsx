"use client"

import { useEffect, useState } from "react"

// UTIL IMPORTS
import { ContentConfig } from "@/configs/homeConfig"
import { fetchTokenData } from "@/network"
import { tokenDataTransformer, isEmpty } from "@/utils"

// COMPONENT IMPORTS
import Chart from "@/components/chart"

export default function Home() {
  const [chartConfig, setChartConfig] = useState<object | null>(null)
  console.log("chartConfig", chartConfig)
  const [averagePrice, setAveragePrice] = useState<number | null>(null)
  const [maxValue, setMaxValue] = useState<number | null>(null)
  const [minValue, setMinValue] = useState<number | null>(null)

  useEffect(() => {
    async function setter() {
      const tokenData = (await fetchTokenData()) as any
      if (isEmpty(tokenData?.result?.data?.json)) {
        setChartConfig({})
      } else {
        const { highChartsDataConfig, averagePrice, maxValue, minValue } =
          tokenDataTransformer(tokenData?.result?.data?.json)
        setChartConfig(highChartsDataConfig)
        setAveragePrice(averagePrice)
        setMaxValue(maxValue)
        setMinValue(minValue)
      }
    }
    setter()
  }, [])

  // MAIN RENDER
  return (
    <main className="md:flex md:h-screen shrink md:w-screen text-zinc-900 overflow-x-hidden">
      <div className="md:flex w-full space-y-20 md:space-y-0 p-2 md:p-20 gap-4">
        {/* LEFT CONTENT */}
        <div className="md:w-[40%]  flex flex-col shrink-0 justify-between gap-8 md:gap-0">
          <div className="space-y-2 md:space-y-4">
            <div>
              <div className="font-bold text-xl md:text-2xl">
                Timewave Challenge
              </div>
              <div className=" text-sm md:text-base font-semibold">
                7-day price chart for a token
              </div>
            </div>
            {ContentConfig.map((section: any) => (
              <div key={section.title} className="space-y-1 md:space-y-2">
                <div className="font-semibold text-sm md:text-base">
                  {section.title}
                </div>
                <ul className="px-4 md:px-8 md:space-y-1 text-xs md:text-sm text-zinc-700 ">
                  {section?.items?.map((item: any) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="space-y-2 md:space-y-4">
            <a
              className="text-blue-500 underline underline-offset-2 text-xs md:text-base"
              href="mailto:sagarchandgadkar619@gmail.com"
            >
              Would appreciate feedback.
            </a>
          </div>
        </div>
        {/* RIGHT CHART CONTENT */}
        <Chart
          chartConfig={chartConfig}
          averagePrice={averagePrice}
          maxValue={maxValue}
          minValue={minValue}
        />
      </div>
    </main>
  )
}

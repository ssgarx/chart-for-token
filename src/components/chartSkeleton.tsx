import React from "react"

export default function ChartSkeleton() {
  return (
    <div className="w-full h-96 md:h-3/4 flex items-end justify-center gap-4 p-20">
      {Array.from({ length: 20 }).map((_, index) => {
        // Calculate a random height between 30% and 80%
        const randomHeight = `${
          Math.floor(Math.random() * (80 - 30 + 1)) + 30
        }%`

        return (
          <div
            className="w-full bg-zinc-200 animate-pulse text-transparent"
            style={{ height: randomHeight }}
            key={index}
          >
            .
          </div>
        )
      })}
    </div>
  )
}

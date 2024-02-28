import React from "react"
import CountUp from "react-countup"

type CountUpProps = {
  children: number
  decimals?: number
}

// NOTE: Use this only when sure about the rounding factor (decimals) at the point of usage/
export default function CountItUp({ children, decimals = 0 }: CountUpProps) {
  // do not bother whole numbers with decimal
  const effectiveDecimals = children % 1 === 0 ? 0 : decimals
  return (
    <CountUp
      decimals={effectiveDecimals}
      useEasing
      duration={1}
      end={children}
    />
  )
}

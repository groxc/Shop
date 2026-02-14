'use client'

import { Heading } from '@/components/ui/Heading'
import { MainStatistics } from './statistics/main-statistics/MainStatistics'
import { MiddleStatistics } from './statistics/middle-statistics/MiddleStatistics'

export function Store() {
  return (
    <div className="p-6 space-y-8">
      <Heading title="Статистика" />
      <div className="mt-3">
        <MainStatistics />
      </div>

      <div className="mt-6">
        {/* <MiddleStatistics /> */}
      </div>
    </div>
  )
}

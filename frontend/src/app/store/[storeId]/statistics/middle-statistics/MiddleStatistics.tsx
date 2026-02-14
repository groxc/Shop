'use client'

import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics'
import { LastUsers } from './LastUsers'
import { Overview } from './Overview'

export function MiddleStatistics() {
  const { middle } = useGetStatistics()

  if (!middle?.monthlySales.length && !middle?.lastUsers.length) {
    return <div className="mt-6 text-slate-500">Нет данных для статистики</div>
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-7 mt-6">
      <div className="col-span-1 lg:col-span-4">
        <Overview data={middle.monthlySales} />
      </div>
      
      <div className="col-span-1 lg:col-span-3">
        <LastUsers data={middle.lastUsers} />
      </div>
    </div>
  )
}
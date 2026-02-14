'use client'

import { FC } from 'react'
import { Card, CardContent } from '../card'
import { Loader } from '../Loader'
import { Skeleton } from '../skeleton'

const DataTableLoading: FC = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-8 w-72 mt-6" />
      <Card className="mt-6 rounded-md border">
        <CardContent>
          <div className="h-130 w-full flex items-center justify-center">
            <Loader />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DataTableLoading
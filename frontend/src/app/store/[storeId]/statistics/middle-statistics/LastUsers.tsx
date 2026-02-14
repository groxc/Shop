'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ILastUsers } from '@/shared/types/statistics.interface'
import { formatPrice } from '@/utils/string/format-price'

interface LastUsersProps {
  data: ILastUsers[]
}

export function LastUsers({ data }: LastUsersProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-4">
        <CardTitle className="text-xl font-medium tracking-[0.1px] line-clamp-1">
          Последние покупатели
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length ? (
          data.map(user => (
            <div key={user.email} className="flex items-center mt-5">
              <Image
                src={user.picture || '/uploads/no-image.png'}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full shrink-0"
              />
              <div className="ml-4 space-y-1 text-sm text-muted-foreground overflow-hidden">
                <p className="leading-none text-black font-medium truncate">
                  {user.name}
                </p>
                <p className="truncate">{user.email}</p>
              </div>
              <div className="ml-auto font-medium text-green-600">
                +{formatPrice(user.total)}
              </div>
            </div>
          ))
        ) : (
          <div>{`У этого магазина нету покупателей :(`}</div>
        )}
      </CardContent>
    </Card>
  )
}
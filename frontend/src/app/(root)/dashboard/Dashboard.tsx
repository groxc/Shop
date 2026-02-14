'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table/DataTable'

import { useProfile } from '@/hooks/useProfile'
import { saveTokenStorage } from '@/services/auth/auth-token.serice'
import { authService } from '@/services/auth/auth.service'
import { EnumOrderStatus } from '@/shared/types/order.interface'
import { formatDate } from '@/utils/date/format-date'
import { formatPrice } from '@/utils/string/format-price'

import { IOrderColumn, orderColumns } from './OrderColumns'

export function Dashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    if (accessToken) saveTokenStorage(accessToken)
  }, [searchParams])

  const { user } = useProfile()

  const { mutate: logout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => router.push('/auth')
  })

  if (!user) return null

  const formattedOrders: IOrderColumn[] = user.orders.map(order => ({
    createdAt: formatDate(order.createdAt),
    status:
      order.status === EnumOrderStatus.PENDING ? 'В ожидании' : 'Оплачен',
    total: formatPrice(order.total)
  }))

  return (
    <div className="my-10 max-w-312 mx-auto px-4 sm:px-0">
      <div className="flex items-center justify-between mb-8 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-green-700 tracking-tight">
            Ваши заказы
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            История ваших покупок и статус текущих заказов
          </p>
        </div>
        
        <Button 
          variant="ghost" 
          onClick={() => logout()}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
        >
          <LogOut className="size-4 mr-2" />
          Выйти
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable columns={orderColumns} data={formattedOrders} />
      </div>
    </div>
  )
}
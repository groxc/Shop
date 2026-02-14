import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { orderService } from '@/services/order.service'

export const useCheckout = () => {
  const { items } = useCart()
  const { reset } = useActions()

  const { mutate: createPayment, isPending: isLoadingCreate } = useMutation({
    mutationKey: ['create order'],
    mutationFn: () =>
      orderService.place({
        items: items.map(item => ({
          price: item.price,
          quantity: item.quantity,
          productId: item.product.id,
          storeId: item.product.storeId
        }))
      }),
    onSuccess() {
      toast.success('Заказ успешно оформлен!')
      reset() 
    },
    onError() {
      toast.error('Ошибка при создании заказа')
    }
  })

  return useMemo(
    () => ({
      createPayment,
      isLoadingCreate
    }),
    [createPayment, isLoadingCreate]
  )
}
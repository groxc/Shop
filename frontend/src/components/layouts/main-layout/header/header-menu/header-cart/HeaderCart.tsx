'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/Heading'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { PUBLIC_URL } from '@/config/url.config'
import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/useProfile'
import { formatPrice } from '@/utils/string/format-price'

import { CartItem } from './cart-item/CartItem'
import { useCheckout } from './useCheckout'


export function HeaderCart() {
  const router = useRouter()
  const { createPayment, isLoadingCreate } = useCheckout()
  const { user } = useProfile()
  const { items, total } = useCart()

  const handleClick = () => {
    user ? createPayment() : router.push(PUBLIC_URL.auth())
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">Корзина</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full w-full sm:max-w-md p-6">
        <Heading title="Корзина товаров" className="text-xl mb-6" />
        
        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
          {items.length ? (
            <div className="space-y-5">
              {items.map(item => (
                <CartItem item={item} key={item.id} />
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground italic h-full flex items-center justify-center">
              Корзина пустая!
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="pt-6 border-t space-y-4">
            <div className="flex items-center justify-between text-lg font-medium">
              <span>Итого:</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Button
              onClick={handleClick}
              variant="default"
              disabled={isLoadingCreate}
              className="w-full py-6 text-base"
            >
              {isLoadingCreate ? 'Оформление...' : 'Перейти к оплате'}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
'use client'

import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ICartItem } from '@/shared/types/cart.interface'
import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

interface CartActionsProps {
  item: ICartItem
}

export function CartActions({ item }: CartActionsProps) {
  const { changeQuantity } = useActions()
  const { items } = useCart()
  
  const quantity = items.find(cartItem => cartItem.id === item.id)?.quantity || 1

  return (
    <div className="flex items-center gap-x-2">
      <div className="flex items-center border rounded-lg overflow-hidden bg-background">
        <Button
          onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
          variant="ghost"
          size="icon"
          disabled={quantity <= 1}
          className="size-8 rounded-none hover:bg-accent transition-colors"
        >
          <Minus className="size-3" />
        </Button>

        <span className="w-8 text-center text-sm font-medium select-none">
          {quantity}
        </span>

        <Button
          onClick={() => changeQuantity({ id: item.id, type: 'plus' })}
          variant="ghost"
          size="icon"
          className="size-8 rounded-none hover:bg-accent transition-colors"
        >
          <Plus className="size-3" />
        </Button>
      </div>
    </div>
  )
}
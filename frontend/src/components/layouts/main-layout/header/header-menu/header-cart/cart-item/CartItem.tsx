'use client'

import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC_URL } from '@/config/url.config'
import { ICartItem } from '@/shared/types/cart.interface'
import { formatPrice } from '@/utils/string/format-price'

import { CartActions } from './CartActions'

interface CartItemProps {
  item: ICartItem
}

export function CartItem({ item }: CartItemProps) {
  return (
    <div className="flex items-center gap-x-4 border-b pb-5 last:border-none last:pb-0">
      <Link
        href={PUBLIC_URL.product(item.product.id)}
        className="relative shrink-0 size-24 rounded-lg overflow-hidden border bg-secondary"
      >
        <Image
          src={item.product.images[0]}
          alt={item.product.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </Link>

      <div className="flex flex-col justify-between self-stretch flex-1 overflow-hidden">
        <div>
          <h2 className="font-medium text-sm sm:text-base line-clamp-1 hover:text-primary transition-colors">
            <Link href={PUBLIC_URL.product(item.product.id)}>
              {item.product.title}
            </Link>
          </h2>
          <p className="text-sm font-semibold mt-1">
            {formatPrice(item.product.price)}
          </p>
        </div>
        
        <div className="mt-auto">
          <CartActions item={item} />
        </div>
      </div>
    </div>
  )
}
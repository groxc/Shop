'use client'

import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC_URL } from '@/config/url.config'
import { IProduct } from '@/shared/types/product.interface'
import { formatPrice } from '@/utils/string/format-price'

interface ProductCardProps {
  product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-white flex flex-col items-start transition-all">
      <Link 
        href={PUBLIC_URL.product(product.id)}
        className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 border border-gray-100"
      >
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="mt-4 w-full px-1">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-1 group-hover:text-green-700 transition-colors">
          <Link href={PUBLIC_URL.product(product.id)}>
            {product.title}
          </Link>
        </h3>
        
        <Link
          href={PUBLIC_URL.category(product.category.id)}
          className="mt-1 block text-sm text-muted-foreground hover:text-green-600 transition-colors"
        >
          {product.category.title}
        </Link>
        
        <p className="mt-2 text-lg font-bold text-gray-900">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  )
}
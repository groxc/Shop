'use client'

import Link from 'next/link'

import { PUBLIC_URL } from '@/config/url.config'
import { IProduct } from '@/shared/types/product.interface'
import { formatPrice } from '@/utils/string/format-price'
import { getReviewWordWithEnding } from '@/utils/string/get-review-word-with-ending'

import { AddToCartButton } from './AddToCartButton'
import { FavoriteButton } from './FavoriteButton'

interface ProductInfoProps {
  product: IProduct
}

export function ProductInfo({ product }: ProductInfoProps) {
  const rating =
    Math.round(
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length
    ) || 0

  return (
    <div className="mt-10 space-y-6 sm:mt-16 lg:mt-0">
      <div>
        <h1 className="text-3xl font-bold text-green-800 sm:text-4xl tracking-tight">
          {product.title}
        </h1>
        <div className="mt-3">
          <p className="text-2xl font-semibold text-green-700">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>

      <hr className="border-green-100" />

      <p className="text-sm text-muted-foreground leading-relaxed">
        {product.description}
      </p>

      <hr className="border-green-100" />

      <div className="space-y-4">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-gray-700">Категория:</h3>
          <Link
            href={PUBLIC_URL.category(product.category.id)}
            className="text-sm text-green-600 hover:text-green-700 transition-colors bg-green-50 px-3 py-1 rounded-md font-medium"
          >
            {product.category.title}
          </Link>
        </div>

        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-gray-700">Средний рейтинг:</h3>
          <div className="text-sm flex items-center gap-x-1">
            <span className="text-yellow-500">⭐</span>
            <span className="font-bold">{rating.toFixed(1)}</span>
            <span className="text-gray-400 mx-1">|</span>
            <span className="text-muted-foreground">
              {product.reviews.length} {getReviewWordWithEnding(product.reviews.length)}
            </span>
          </div>
        </div>
      </div>

      <hr className="border-green-100" />

      <div className="flex items-center gap-x-4 pt-2">
        <AddToCartButton product={product} />
        <FavoriteButton product={product} />
      </div>
    </div>
  )
}
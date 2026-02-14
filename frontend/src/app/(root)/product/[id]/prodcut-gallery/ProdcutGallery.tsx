'use client'

import Image from 'next/image'
import { useState } from 'react'

import { IProduct } from '@/shared/types/product.interface'
import { cn } from '@/utils/clsx'

interface ProdcutGalleryProps {
  product: IProduct
}

export function ProdcutGallery({ product }: ProdcutGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = product.images?.length > 0 ? product.images : ['/images/no-image.png']

  return (
    <div className="flex flex-col gap-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
        <Image
          src={images[currentIndex]}
          alt={product.title}
          fill
          priority
          className="object-cover transition-opacity duration-300"
        />
      </div>

      <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg border-2 transition-all outline-none",
              index === currentIndex 
                ? "border-green-600 ring-2 ring-green-100" 
                : "border-transparent hover:border-green-200"
            )}
          >
            <Image
              src={image}
              alt={`${product.title} preview ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
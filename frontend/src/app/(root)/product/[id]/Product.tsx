'use client'

import { useQuery } from '@tanstack/react-query'
import { Catalog } from '@/components/ui/catalog/Catalog'
import { productService } from '@/services/product.service'
import { IProduct } from '@/shared/types/product.interface'

import { ProdcutGallery } from './prodcut-gallery/ProdcutGallery'
import { ProductInfo } from './product-info/ProductInfo'
import { ProductReviews } from './product-reviews/ProductReviews'

interface ProductProps {
  initialProduct: IProduct
  similarProducts: IProduct[]
  id: string // Сделали обязательным для соответствия странице
}

export function Product({
  initialProduct,
  similarProducts,
  id
}: ProductProps) {
  const { data: product } = useQuery({
    queryKey: ['get product', initialProduct.id],
    queryFn: () => productService.getById(id),
    initialData: initialProduct,
    enabled: !!id
  })

  return (
    <div className="mx-auto max-w-7xl">
      <div className="px-4 py-10 sm:px-6 lg:px-8 space-y-16">
        <section className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          {/* Используем данные из query, чтобы галерея обновлялась при рефетче */}
          <ProdcutGallery product={product} />
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <ProductInfo product={product} />
          </div>
        </section>

        <Catalog 
          title="Похожие товары" 
          products={similarProducts} 
        />

        <hr className="border-gray-200" />

        <ProductReviews product={product} />
      </div>
    </div>
  )
}
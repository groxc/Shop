import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { ICatalog } from './catalog.interface'
import { ProductCard } from './product-card/ProductCard'

export function Catalog({
  title,
  description,
  linkTitle,
  link,
  products
}: ICatalog) {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-312">
        <div className="space-y-8">
          {/* Заголовок секции */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-y-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                {title}
              </h2>
              {description && (
                <p className="mt-3 text-base md:text-lg text-gray-600">
                  {description}
                </p>
              )}
            </div>
            {link && linkTitle && (
              <Link 
                href={link}
                className="group hidden md:inline-flex items-center gap-2 text-base font-semibold text-green-600 hover:text-green-700 transition-colors"
              >
                {linkTitle}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>

          {/* Сетка продуктов */}
          <div className="w-full">
            {products.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                <p className="text-gray-500 text-lg">Ничего не найдено</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
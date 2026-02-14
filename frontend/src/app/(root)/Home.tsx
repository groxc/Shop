import { Catalog } from '@/components/ui/catalog/Catalog'

import { PUBLIC_URL } from '@/config/url.config'

import { IProduct } from '@/shared/types/product.interface'

import { Hero } from './hero/Hero'

interface HomeProps {
  products: IProduct[]
}

export function Home({ products }: HomeProps) {
  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <Hero />
      <Catalog
        title='Лучшее от AgroLine'
        description='Отборные овощи и свежая продукция, проверенные нашими покупателями.'
        linkTitle='Перейти в каталог'
        link={PUBLIC_URL.explorer()}
        products={products}
      />
    </div>
  )
}
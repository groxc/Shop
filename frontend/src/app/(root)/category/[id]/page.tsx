import type { Metadata } from 'next'
import { Catalog } from '@/components/ui/catalog/Catalog'
import { categoryService } from '@/services/category.service'
import { productService } from '@/services/product.service'

export const revalidate = 60

// Типизируем пропсы согласно новым требованиям Next.js 15
interface CategoryPageProps {
  params: Promise<{ id: string }>
}

async function getProducts(id: string) {
  // Выполняем запросы параллельно, чтобы ускорить загрузку страницы
  const [products, category] = await Promise.all([
    productService.getByCategory(id),
    categoryService.getById(id)
  ])

  return { products, category }
}

export async function generateMetadata({
  params
}: CategoryPageProps): Promise<Metadata> {
  const { id } = await params // Обязательный await для Next.js 15
  const { category, products } = await getProducts(id)

  return {
    title: category.title,
    description: category.description,
    openGraph: {
      images: products[0]?.images[0] ? [
        {
          url: products[0].images[0],
          width: 1000,
          height: 1000,
          alt: category.title
        }
      ] : []
    }
  }
}

export default async function CategoryPage({
  params
}: CategoryPageProps) {
  const { id } = await params // Обязательный await
  const { category, products } = await getProducts(id)

  return (
    <div className='my-6'>
      <Catalog
        title={category.title}
        description={category.description}
        products={products}
      />
    </div>
  )
}
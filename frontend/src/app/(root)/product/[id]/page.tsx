import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { productService } from '@/services/product.service'
import { Product } from './Product'

export const revalidate = 60

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const products = await productService.getAll()

  return products.map(product => ({
    id: product.id
  }))
}

async function getProducts(paramsPromise: Promise<{ id: string }>) {
  try {
    const { id } = await paramsPromise
    const product = await productService.getById(id)
    const similarProducts = await productService.getSimilar(id)

    return { product, similarProducts, id }
  } catch {
    return notFound()
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product } = await getProducts(params)

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [
        {
          url: product.images[0],
          width: 1000,
          height: 1000,
          alt: product.title
        }
      ]
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const { product, similarProducts, id } = await getProducts(params)

  return (
    <Product
      initialProduct={product}
      similarProducts={similarProducts}
      id={id}
    />
  )
}
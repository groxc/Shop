'use client'

import { Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating'

import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { ReviewModal } from '@/components/ui/modals/ReviewModal'
import { useDeleteReview } from '@/hooks/queries/reviews/useDeleteReview'
import { useProfile } from '@/hooks/useProfile'
import { IProduct } from '@/shared/types/product.interface'

interface ProductReviewsProps {
  product: IProduct
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const { user } = useProfile()
  const { deleteReview } = useDeleteReview()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold text-green-800">Отзывы</h1>
        {user && (
          <ReviewModal storeId={product.storeId}>
            <Button variant="ghost" className="text-green-700 hover:bg-green-50 gap-x-2">
              <Plus className="size-4" />
              Добавить отзыв
            </Button>
          </ReviewModal>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {product.reviews.length ? (
          product.reviews.map(review => (
            <div 
              key={review.id} 
              className="flex flex-col border border-green-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all bg-white"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-x-3">
                  <div className="relative size-10 rounded-full overflow-hidden border-2 border-green-500">
                    <Image
                      src={review.user.picture}
                      alt={review.user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-semibold text-green-700 text-sm">
                    {review.user.name}
                  </span>
                </div>
                
                {review.user.id === user?.id && (
                  <ConfirmModal handleClick={() => deleteReview(review.id)}>
                    <button className="text-red-400 hover:text-red-600 transition-colors p-1">
                      <Trash className="size-4" />
                    </button>
                  </ConfirmModal>
                )}
              </div>

              <div className="mb-2">
                <Rating
                  readonly
                  initialValue={review.rating}
                  SVGstyle={{ display: 'inline-block' }}
                  size={16}
                  allowFraction
                  transition
                />
              </div>

              <p className="text-sm text-gray-600 leading-relaxed italic">
                «{review.text}»
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-100 rounded-2xl">
            <p className="text-muted-foreground italic">У этого товара пока нет отзывов</p>
          </div>
        )}
      </div>
    </div>
  )
}
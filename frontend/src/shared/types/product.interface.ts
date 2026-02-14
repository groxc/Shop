import { ICategory } from './category.interface'
import { IReview } from './review.interface'

export interface IProduct {
	id: string
	title: string
	description: string
	price: number
	images: string[]
	category: ICategory
	reviews: IReview[]
	storeId: string
}

export interface IProductInput
	extends Omit<
		IProduct,
		'id' | 'reviews' | 'storeId' | 'category'
	> {
	categoryId: string
}

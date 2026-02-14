import { Module } from '@nestjs/common'
import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { ProductService } from '../product/product.service'

@Module({
	controllers: [ReviewController],
	providers: [ReviewService, PrismaService, ProductService]
})
export class ReviewModule {}

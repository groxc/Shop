import { Injectable } from '@nestjs/common'
import { EnumOrderStatus } from '@prisma/client'
import { OrderDto } from './dto/order.dto'
import { PrismaService } from 'src/infra/prisma/prisma.service'

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createPayment(dto: OrderDto, userId: string) {
    const orderItems = dto.items.map(item => ({
      quantity: item.quantity,
      price: item.price,
      product: {
        connect: { id: item.productId }
      },
      store: {
        connect: { id: item.storeId }
      }
    }))

    const total = dto.items.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)

    // Создаем заказ сразу со статусом PAYED (или тем, который у тебя в Prisma)
    const order = await this.prisma.order.create({
      data: {
        status: EnumOrderStatus.PAYED, // Сразу ставим статус "Оплачено"
        items: {
          create: orderItems
        },
        total,
        user: {
          connect: { id: userId }
        }
      }
    })

    return order
  }

  // Метод updateStatus можно оставить пустым или удалить, 
  // если ты не планируешь использовать вебхуки в будущем
}
'use client'

import { ArrowRight, Leaf, ShoppingBasket, Truck } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { PUBLIC_URL } from '@/config/url.config'

export function Hero() {
  return (
    <section className="relative overflow-hidden  bg-linear-to-b from-green-50 via-white to-transparent">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" />
      </div>

      {/* Основной контейнер */}
      <div className="container mx-auto px-4 sm:px-6 max-w-300">
        <div className="relative my-16 py-12 text-center flex flex-col items-center space-y-8">
          {/* Бейдж */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium shadow-sm">
            <Leaf className="w-4 h-4" />
            <span>100% натуральные продукты</span>
          </div>

          {/* Заголовок */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-5xl">
            <span className="text-gray-900">Свежие овощи и фрукты</span>
            <br />
            <span className="bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              прямо от фермеров
            </span>
          </h1>
          
          {/* Подзаголовок */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
            Оптовые закупки натуральной продукции напрямую от производителей. 
            Свежесть, качество и выгодные цены в одном месте.
          </p>

          {/* CTA кнопка */}
          <Link href={PUBLIC_URL.explorer()}>
            <Button 
              size="lg" 
              className="group text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:scale-105"
            >
              <ShoppingBasket className="w-5 h-5 mr-2" />
              Перейти к каталогу
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          {/* Преимущества */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl pt-8">
            <div className="flex flex-col items-center gap-3 p-6 bg-white/80 backdrop-blur rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Экологично</h3>
              <p className="text-sm text-gray-600 text-center">Без химии и ГМО</p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 bg-white/80 backdrop-blur rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Быстрая доставка</h3>
              <p className="text-sm text-gray-600 text-center">От 1 дня по всей стране</p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 bg-white/80 backdrop-blur rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <ShoppingBasket className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Оптовые цены</h3>
              <p className="text-sm text-gray-600 text-center">Выгода до 40%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
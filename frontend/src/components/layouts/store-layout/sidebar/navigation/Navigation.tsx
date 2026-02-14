'use client'

import { useParams } from 'next/navigation'
import { Album, BarChart, FolderKanban, Settings, Star } from 'lucide-react'
import { STORE_URL } from '@/config/url.config'
import { MenuItem } from './MenuItem'
import { IMenuItem } from './menu.interface'

export function Navigation() {
  const params = useParams<{ storeId: string }>()

  const routes: IMenuItem[] = [
    {
      icon: BarChart,
      link: STORE_URL.home(params.storeId),
      value: 'Статистика'
    },
    {
      icon: FolderKanban,
      link: STORE_URL.products(params.storeId),
      value: 'Товары'
    },
    {
      icon: Album,
      link: STORE_URL.categories(params.storeId),
      value: 'Категории'
    },
    {
      icon: Star,
      link: STORE_URL.reviews(params.storeId),
      value: 'Отзывы'
    },
    {
      icon: Settings,
      link: STORE_URL.settings(params.storeId),
      value: 'Настройки магазина'
    }
  ]

  return (
    <nav className="flex flex-col w-full flex-1 mt-6 space-y-3">
      {routes.map(route => (
        <MenuItem key={route.value} route={route} />
      ))}
    </nav>
  )
}
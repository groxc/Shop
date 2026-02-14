'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IMenuItem } from './menu.interface'
import { cn } from '@/lib/utils'

interface MenuItemProps {
  route: IMenuItem
}

export function MenuItem({ route }: MenuItemProps) {
  const pathname = usePathname()
  const isActive = pathname === route.link

  return (
    <Link
      href={route.link}
      className={cn(
        "flex items-center gap-x-3 text-gray-600 text-sm font-medium py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-green-100/60 hover:text-green-700",
        isActive && "bg-linear-to-r from-green-100 to-emerald-100 text-green-700 shadow-sm font-semibold"
      )}
    >
      <route.icon className={cn(
        "size-5 transition-colors",
        isActive ? "text-green-600" : "text-gray-500"
      )} />
      <span>{route.value}</span>
    </Link>
  )
}
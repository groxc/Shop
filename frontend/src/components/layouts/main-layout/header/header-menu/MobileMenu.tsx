'use client'

import { Menu, Heart, Store, LayoutDashboard, ShoppingBag, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useProfile } from '@/hooks/useProfile'
import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/config/url.config'
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal'
import { Loader } from '@/components/ui/Loader'

export function MobileMenu() {
  const { user, isLoading } = useProfile()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-75 p-0">
        <SheetTitle className="sr-only">Меню навигации</SheetTitle>
        
        <div className="flex flex-col h-full bg-white">
          {/* Верхняя часть: Профиль */}
          <div className="p-6 border-b border-gray-100">
            {isLoading ? (
              <Loader size="sm" />
            ) : user ? (
              <Link href={DASHBOARD_URL.home()} className="flex items-center gap-x-3">
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={45}
                  height={45}
                  className="rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 leading-tight">{user.name}</span>
                  <span className="text-xs text-gray-500">Личный кабинет</span>
                </div>
              </Link>
            ) : (
              <Link href={PUBLIC_URL.auth()}>
                <Button variant="default" className="">
                  <LogOut className="size-4" />
                  Войти в аккаунт
                </Button>
              </Link>
            )}
          </div>

          {/* Основная навигация */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link 
              href={PUBLIC_URL.explorer()} 
              className="flex items-center gap-x-4 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
            >
              <ShoppingBag className="size-5 text-gray-400 group-hover:text-primary" />
              <span className="font-medium">Каталог</span>
            </Link>

            {user && (
              <>
                <Link 
                  href={DASHBOARD_URL.favorites()} 
                  className="flex items-center gap-x-4 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <Heart className="size-5 text-gray-400 group-hover:text-red-500" />
                  <span className="font-medium">Избранное</span>
                </Link>

                {user.stores.length ? (
                  <Link 
                    href={STORE_URL.home(user.stores[0].id)} 
                    className="flex items-center gap-x-4 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <Store className="size-5 text-gray-400 group-hover:text-primary" />
                    <span className="font-medium">Мои магазины</span>
                  </Link>
                ) : (
                  <CreateStoreModal>
                    <button className="flex items-center gap-x-4 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group w-full text-left">
                      <Store className="size-5 text-gray-400 group-hover:text-primary" />
                      <span className="font-medium">Создать магазин</span>
                    </button>
                  </CreateStoreModal>
                )}

                <Link 
                  href={DASHBOARD_URL.home()} 
                  className="flex items-center gap-x-4 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <LayoutDashboard className="size-5 text-gray-400 group-hover:text-primary" />
                  <span className="font-medium">Панель управления</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
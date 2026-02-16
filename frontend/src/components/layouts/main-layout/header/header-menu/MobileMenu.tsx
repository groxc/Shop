'use client'

import { useState } from 'react'
import { Menu, Heart, Store, ShoppingBag, LogOut, ShoppingCart, ChevronLeft, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useProfile } from '@/hooks/useProfile'
import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/config/url.config'
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal'
import { Loader } from '@/components/ui/Loader'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/string/format-price'
import { useCheckout } from './header-cart/useCheckout'
import { CartItem } from './header-cart/cart-item/CartItem'

export function MobileMenu() {
  const [view, setView] = useState<'menu' | 'cart'>('menu')
  const { user, isLoading } = useProfile()
  const { items, total } = useCart()
  const { createPayment, isLoadingCreate } = useCheckout()

  return (
    <Sheet onOpenChange={(open) => !open && setView('menu')}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-full sm:w-95 p-0 flex flex-col border-none shadow-2xl">
        <SheetTitle className="sr-only">
          {view === 'menu' ? 'Меню навигации' : 'Корзина'}
        </SheetTitle>
        
        {view === 'menu' ? (
          <div className="flex flex-col h-full bg-white">
            {/* Профиль */}
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              {isLoading ? (
                <Loader size="sm" />
              ) : user ? (
                <Link href={DASHBOARD_URL.home()} className="flex items-center gap-x-4">
                  <Image src={user.picture} alt={user.name} width={48} height={48} className="rounded-full border-2 border-white shadow-sm object-cover" />
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 leading-tight">{user.name}</span>
                    <span className="text-xs text-primary font-medium">Личный кабинет</span>
                  </div>
                </Link>
              ) : (
                <Link href={PUBLIC_URL.auth()} className="w-full">
                  <Button variant="default" className="w-full justify-start gap-x-2">
                    <LogOut className="size-4" /> Войти в аккаунт
                  </Button>
                </Link>
              )}
            </div>

            {/* Навигация */}
            <nav className="flex-1 px-4 py-6 space-y-1">
              <Link href={PUBLIC_URL.explorer()} className="flex items-center gap-x-4 px-4 py-3.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all group">
                <ShoppingBag className="size-5 text-gray-400 group-hover:text-primary" />
                <span className="font-semibold">Каталог</span>
              </Link>

              <button 
                onClick={() => setView('cart')}
                className="flex items-center gap-x-4 px-4 py-3.5 text-gray-700 hover:bg-gray-50 rounded-xl w-full text-left transition-all group"
              >
                <div className="relative">
                  <ShoppingCart className="size-5 text-gray-400 group-hover:text-primary" />
                  {items.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                      {items.length}
                    </span>
                  )}
                </div>
                <span className="font-semibold">Корзина</span>
              </button>

              {user && (
                <>
                  <Link href={DASHBOARD_URL.favorites()} className="flex items-center gap-x-4 px-4 py-3.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all group">
                    <Heart className="size-5 text-gray-400 group-hover:text-red-500" />
                    <span className="font-semibold">Избранное</span>
                  </Link>

                  {user.stores.length ? (
                    <Link href={STORE_URL.home(user.stores[0].id)} className="flex items-center gap-x-4 px-4 py-3.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all group">
                      <Store className="size-5 text-gray-400 group-hover:text-primary" />
                      <span className="font-semibold">Мои магазины</span>
                    </Link>
                  ) : (
                    <CreateStoreModal>
                      <button className="flex items-center gap-x-4 px-4 py-3.5 text-gray-700 hover:bg-gray-50 rounded-xl w-full text-left transition-all group">
                        <PlusCircle className="size-5 text-gray-400 group-hover:text-primary" />
                        <span className="font-semibold">Создать магазин</span>
                      </button>
                    </CreateStoreModal>
                  )}
                </>
              )}
            </nav>
          </div>
        ) : (
          /* Контент корзины */
          <div className="flex flex-col h-full bg-white">
            <div className="p-6 border-b border-gray-100 flex items-center gap-x-4">
              <button onClick={() => setView('menu')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft className="size-6 text-gray-600" />
              </button>
              <h2 className="text-xl font-extrabold text-gray-900">Корзина</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length ? (
                <div className="space-y-6">
                  {items.map(item => <CartItem item={item} key={item.id} />)}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
                  <ShoppingCart className="size-12 opacity-20" />
                  <p className="italic">Корзина пока пуста</p>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t bg-gray-50/50 space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span className="text-gray-600">Итого:</span>
                  <span className="text-primary text-xl">{formatPrice(total)}</span>
                </div>
                <Button 
                  disabled={isLoadingCreate}
                  className="w-full py-7 text-base font-bold shadow-lg shadow-primary/20"
                >
                  {isLoadingCreate ? 'Оформление...' : 'Перейти к оплате'}
                </Button>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
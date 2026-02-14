'use client'

import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/config/url.config'
import { Button } from '@/components/ui/button'
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal'
import { Loader } from '@/components/ui/Loader'
import { useProfile } from '@/hooks/useProfile'
import { HeaderCart } from './header-cart/HeaderCart'

export function HeaderMenu() {
  const { user, isLoading } = useProfile()

  return (
    <div className="hidden items-center gap-x-2 ml-auto lg:flex">
      <HeaderCart />
      
      <Link href={PUBLIC_URL.explorer()}>
        <Button variant="ghost">Каталог</Button>
      </Link>

      {isLoading ? (
        <Loader size="sm" />
      ) : user ? (
        <>
          <Link href={DASHBOARD_URL.favorites()}>
            <Button variant="ghost">Избранное</Button>
          </Link>

          {user.stores.length ? (
            <Link href={STORE_URL.home(user.stores[0].id)}>
              <Button variant="ghost">Мои магазины</Button>
            </Link>
          ) : (
            // Добавляем asChild внутри самого CreateStoreModal (см. пункт 2)
            <CreateStoreModal>
               <Button variant="ghost">Создать магазин</Button>
            </CreateStoreModal>
          )}

          <Link href={DASHBOARD_URL.home()} className="ml-2">
            <Image
              src={user.picture}
              alt={user.name}
              width={42}
              height={42}
              className="rounded-full shrink-0"
            />
          </Link>
        </>
      ) : (
        <Link href={PUBLIC_URL.auth()}>
          <Button variant="default">
            <LogOut className="size-4 mr-2" />
            Войти
          </Button>
        </Link>
      )}
    </div>
  )
}
'use client'

import Image from 'next/image'
import Link from 'next/link'

import { DASHBOARD_URL } from '@/config/url.config'
import { MobileSidebar } from '../sidebar/MobileSidebar'
import { StoreSwitcher } from './StoreSwitcher'
import { useProfile } from '@/hooks/useProfile'
import { Loader } from '@/components/ui/Loader'

export function Header() {
  const { user, isLoading } = useProfile()

  return (
    <header className="p-6 gap-x-4 h-full flex items-center bg-white border-b">
      <MobileSidebar />
      
      <div className="flex items-center gap-x-4 ml-auto">
        {isLoading ? (
          <Loader size="sm" />
        ) : (
          user && (
            <>
              <StoreSwitcher items={user.stores} />
              <Link href={DASHBOARD_URL.home()}>
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={42}
                  height={42}
                  className="rounded-full"
                />
              </Link>
            </>
          )
        )}
      </div>
    </header>
  )
}
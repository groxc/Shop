import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC_URL } from '@/config/url.config'
import { SITE_NAME } from '@/constants/seo.constants'

export function Logo() {
  return (
    <Link 
      href={PUBLIC_URL.home()} 
      className="flex items-center gap-x-3 hover:opacity-80 transition-opacity"
    >
      <div className="text-2xl font-extrabold text-green-600">
        {SITE_NAME}
      </div>
    </Link>
  )
}
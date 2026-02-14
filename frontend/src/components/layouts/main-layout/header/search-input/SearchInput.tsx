'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PUBLIC_URL } from '@/config/url.config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/From/input'

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(PUBLIC_URL.explorer(`?searchTerm=${searchTerm}`))
    }
  }

  return (
    <div className="relative group w-full">
      <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-green-500/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-500/5 transition-all duration-300">
        <Input
          type="text"
          placeholder="Поиск свежих овощей, фруктов..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1 px-5 h-12 border-0 focus-visible:ring-0 bg-transparent text-gray-700 placeholder:text-gray-400"
        />
        <Button
          onClick={handleSearch}
          size="icon"
          className="h-9 w-9 mr-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors shadow-sm"
        >
          <Search className="size-4" />
        </Button>
      </div>
    </div>
  )
}
'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'

import { STORE_URL } from '@/config/url.config'
import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'
import { formatDate } from '@/utils/date/format-date'

import { ICategoryColumn, categoryColumns } from './CategoryColumns'

export function Categories() {
  const params = useParams<{ storeId: string }>()
  const { categories, isLoading } = useGetCategories()

  const formattedCategories: ICategoryColumn[] = categories
    ? categories.map(category => ({
        id: category.id,
        createdAt: formatDate(category.createdAt),
        title: category.title,
        storeId: category.storeId
      }))
    : []

  return (
    <div className="p-6">
      {isLoading ? (
        <DataTableLoading />
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <Heading
              title={`Категории (${categories?.length || 0})`}
              description="Все категории вашего магазина"
            />
            <Link href={STORE_URL.categoryCreate(params.storeId)}>
              <Button variant="default" className="flex items-center gap-x-2">
                <Plus className="size-4" />
                Создать
              </Button>
            </Link>
          </div>
          
          <div className="mt-3">
            <DataTable
              columns={categoryColumns}
              data={formattedCategories}
              filterKey="title"
            />
          </div>
        </>
      )}
    </div>
  )
}
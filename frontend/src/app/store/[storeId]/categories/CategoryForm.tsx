'use client'

import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/Heading'
import { Textarea } from '@/components/ui/textarea'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'


import { useCreateCategory } from '@/hooks/queries/categories/useCreateCategory'
import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory'
import { useUpdateCategory } from '@/hooks/queries/categories/useUpdateCategory'
import { ICategory, ICategoryInput } from '@/shared/types/category.interface'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/From/form'
import { Input } from '@/components/ui/From/input'

interface ICategoryForm {
  category?: ICategory | null
}

export function CategoryForm({ category }: ICategoryForm) {
  const { createCategory, isLoadingCreate } = useCreateCategory()
  const { updateCategory, isLoadingUpdate } = useUpdateCategory()
  const { deleteCategory, isLoadingDelete } = useDeleteCategory()

  const title = category ? 'Изменить данные' : 'Создать категорию'
  const description = category
    ? 'Изменить данные о категории'
    : 'Добавить новую категорию в магазин'
  const action = category ? 'Сохранить' : 'Создать'

  const form = useForm<ICategoryInput>({
    mode: 'onChange',
    values: {
      title: category?.title || '',
      description: category?.description || ''
    }
  })

  const onSubmit: SubmitHandler<ICategoryInput> = data => {
    if (category) updateCategory(data)
    else createCategory(data)
  }

  const isPending = isLoadingCreate || isLoadingUpdate

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <Heading title={title} description={description} />
        {category && (
          <ConfirmModal handleClick={() => deleteCategory()}>
            <Button
              size="icon"
              variant="destructive"
              disabled={isLoadingDelete}
            >
              <Trash className="size-4" />
            </Button>
          </ConfirmModal>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: 'Название обязательно' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Название категории"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            rules={{ required: 'Описание обязательно' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Описание категории"
                    disabled={isPending}
                    className="min-h-30"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="default"
            disabled={isPending}
            className="px-10"
          >
            {isPending ? 'Загрузка...' : action}
          </Button>
        </form>
      </Form>
    </div>
  )
}
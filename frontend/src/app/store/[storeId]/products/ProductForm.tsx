'use client'

import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/Heading'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'

import { useCreateProduct } from '@/hooks/queries/products/useCreateProduct'
import { useDeleteProduct } from '@/hooks/queries/products/useDeleteProduct'
import { useUpdateProduct } from '@/hooks/queries/products/useUpdateProduct'

import { ICategory } from '@/shared/types/category.interface'
import { IProduct, IProductInput } from '@/shared/types/product.interface'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/From/form'
import { Input } from '@/components/ui/From/input'
import { ImageUpload } from '@/components/ui/From/image-upload/ImageUpload'

interface ProductFormProps {
  product?: IProduct
  categories: ICategory[]
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const { createProduct, isLoadingCreate } = useCreateProduct()
  const { updateProduct, isLoadingUpdate } = useUpdateProduct()
  const { deleteProduct, isLoadingDelete } = useDeleteProduct()

  const title = product ? 'Изменить данные' : 'Создать товар'
  const description = product
    ? 'Изменить данные о товаре'
    : 'Добавить новый товар в магазин'
  const action = product ? 'Сохранить' : 'Создать'

  const form = useForm<IProductInput>({
    mode: 'onChange',
    values: {
      title: product?.title || '',
      description: product?.description || '',
      images: product?.images || [],
      price: product?.price || 0,
      categoryId: product?.category.id || '',
    }
  })

  const onSubmit: SubmitHandler<IProductInput> = data => {
    data.price = Number(data.price)
    if (product) updateProduct(data)
    else createProduct(data)
  }

  const isPending = isLoadingCreate || isLoadingUpdate

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <Heading title={title} description={description} />
        {product && (
          <ConfirmModal handleClick={() => deleteProduct()}>
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="images"
            rules={{ required: 'Загрузите хотя бы одну картинку' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Картинки</FormLabel>
                <FormControl>
                  <ImageUpload
                    isDisabled={isPending}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: 'Название обязательно' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Название товара"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              rules={{ required: 'Цена обязательна' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Цена товара"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              rules={{ required: 'Категория обязательна' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Категория</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                    placeholder="Подробное описание товара"
                    disabled={isPending}
                    className="min-h-30"
                    {...field}
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
            className="w-full sm:w-auto px-12"
          >
            {isPending ? 'Загрузка...' : action}
          </Button>
        </form>
      </Form>
    </div>
  )
}
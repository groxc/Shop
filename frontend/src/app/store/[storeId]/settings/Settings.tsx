'use client'

import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useDeleteStore } from '@/hooks/queries/stores/useDeleteStore'
import { useUpdateStore } from '@/hooks/queries/stores/useUpdateStore'
import { IStoreEdit } from '@/shared/types/store.interface'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/From/form'
import { Input } from '@/components/ui/From/input'
import { Heading } from '@/components/ui/Heading'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { Textarea } from '@/components/ui/textarea'

export function Settings() {
  const { store, updateStore, isLoadingUpdate } = useUpdateStore()
  const { deleteStore, isLoadingDelete } = useDeleteStore()

  const form = useForm<IStoreEdit>({
    mode: 'onChange',
    values: {
      title: store?.title || '',
      description: store?.description || '',
    },
  })

  const onSubmit: SubmitHandler<IStoreEdit> = data => {
    updateStore(data)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <Heading 
          title="Настройки" 
          description="Управление настройками магазина" 
        />
        <ConfirmModal handleClick={() => deleteStore()}>
          <Button 
            size="icon" 
            variant="destructive" 
            disabled={isLoadingDelete}
            className="shrink-0"
          >
            <Trash className="size-4" />
          </Button>
        </ConfirmModal>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: 'Название обязательно',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Название магазина" 
                      disabled={isLoadingUpdate} 
                      {...field} 
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Описание магазина" 
                    disabled={isLoadingUpdate} 
                    {...field} 
                    className="min-h-25"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit"
            variant="default" 
            disabled={isLoadingUpdate}
            className="px-8"
          >
            {isLoadingUpdate ? 'Сохранение...' : 'Сохранить изменения'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
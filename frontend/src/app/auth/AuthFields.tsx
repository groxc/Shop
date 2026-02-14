import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/From/form'
import { Input } from '@/components/ui/From/input'
import { IAuthForm } from '@/shared/types/auth.interface'
import { UseFormReturn } from 'react-hook-form'


interface AuthFieldsProps {
  form: UseFormReturn<IAuthForm>
  isPending: boolean
  isReg: boolean
}

export function AuthFields({ form, isPending, isReg }: AuthFieldsProps) {
  return (
    <div className="space-y-4">
      {isReg && (
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Иван" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="email" 
                placeholder="example@mail.com" 
                disabled={isPending} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Пароль</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="password" 
                placeholder="******" 
                disabled={isPending} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
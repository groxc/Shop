'use client'

import { useState } from 'react'
import { AuthFields } from './AuthFields'
import { useAuthForm } from './useAuthForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/From/form'

export function Auth() {
  const [isReg, setIsReg] = useState(false)
  const { onSubmit, form, isPending } = useAuthForm(isReg)

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Card className="border border-gray-200 shadow-xl rounded-2xl p-8 w-100 bg-white">
          <CardHeader className="text-center pb-6">
            <CardTitle className="pb-2 text-3xl font-extrabold text-green-700">
              {isReg ? 'Создать аккаунт' : 'Войти в аккаунт'}
            </CardTitle>
            <CardDescription>
              Войдите или создайте учетную запись, чтобы оформлять покупки!
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 w-full">
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-5"
              >
                <AuthFields
                  form={form}
                  isPending={isPending}
                  isReg={isReg}
                />

                <Button 
                  disabled={isPending}
                  className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white font-medium"
                >
                  Продолжить
                </Button>
              </form>
            </Form>
            
            <div className="space-y-3 w-full mt-6">
            </div>
          </CardContent>

          <CardFooter className="p-0 mt-6 text-sm text-gray-500 flex justify-center">
            {isReg ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}
            <button 
              onClick={() => setIsReg(!isReg)}
              className="ml-1 text-green-700 font-medium hover:underline"
            >
              {isReg ? 'Войти' : 'Создать'}
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
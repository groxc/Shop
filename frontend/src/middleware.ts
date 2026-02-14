import { type NextRequest, NextResponse } from 'next/server'
import { PUBLIC_URL } from './config/url.config'
import { EnumTokens } from './services/auth/auth-token.serice'

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
  const { pathname } = request.nextUrl

  const isAuthPage = pathname.startsWith(PUBLIC_URL.auth())

  // Если пользователь на странице логина, но у него есть токен — отправляем домой
  if (isAuthPage) {
    if (refreshToken) {
      return NextResponse.redirect(new URL(PUBLIC_URL.home(), request.url))
    }
    return NextResponse.next()
  }

  // Если токена нет и страница приватная — отправляем на логин
  if (!refreshToken) {
    return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
  }

  return NextResponse.next()
}

// Указываем, какие пути должен обрабатывать этот файл
export const config = {
  matcher: ['/dashboard/:path*', '/store/:path*', '/auth']
}
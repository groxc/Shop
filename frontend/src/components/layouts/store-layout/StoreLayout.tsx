import type { PropsWithChildren } from 'react'
import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'

export function StoreLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="flex flex-col w-full">
      <div className="relative">
        <aside className="hidden lg:flex h-full w-64 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </aside>
        
        <header className="h-17.5 lg:pl-64 fixed inset-y-0 w-full z-49">
          <Header />
        </header>

        <main className="lg:pl-64 pt-17.5 bg-white min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
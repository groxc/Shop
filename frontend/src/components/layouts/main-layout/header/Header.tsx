import { HeaderMenu } from './header-menu/HeaderMenu'
import { MobileMenu } from './header-menu/MobileMenu'
import { Logo } from './logo/Logo'
import { SearchInput } from './search-input/SearchInput'


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="max-w-312 mx-auto px-4 lg:px-0 h-20 flex items-center justify-between gap-x-8">
        
        <div className="shrink-0">
          <Logo />
        </div>

        <div className="flex-1 max-w-125 hidden md:block">
          <SearchInput />
        </div>

        <div className="flex items-center gap-x-4">
          {/* Десктопное меню скрыто на малых экранах */}
          <HeaderMenu />
          
          {/* Мобильное меню (кнопка) появится только на lg:hidden */}
          <MobileMenu />
        </div>
        
      </div>
    </header>
  )
}
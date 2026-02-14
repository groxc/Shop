import { HeaderMenu } from './header-menu/HeaderMenu'
import { Logo } from './logo/Logo'
import { SearchInput } from './search-input/SearchInput'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      {/* Контейнер, который ограничивает ширину и центрирует всё */}
      <div className="max-w-312 mx-auto px-4 lg:px-0 h-20 flex items-center justify-between gap-x-8">
        
        {/* Лого строго по левому краю контейнера */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Поиск центрируется и занимает гибкое пространство */}
        <div className="flex-1 max-w-125 hidden md:block">
          <SearchInput />
        </div>

        {/* Меню строго по правому краю контейнера */}
        <div className="shrink-0">
          <HeaderMenu />
        </div>
        
      </div>
    </header>
  )
}
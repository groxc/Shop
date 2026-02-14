export function Footer() {
  return (
    <footer className="mt-16 border-t bg-background">
      <div className="mx-auto max-w-screen-2xl px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-y-2">
          <p className="text-sm text-muted-foreground text-center">
            AgroLine &copy; {new Date().getFullYear()} Все права защищены
          </p>
          <div className="text-xs text-muted-foreground/60">
            Надежный инструмент для вашего бизнеса
          </div>
        </div>
      </div>
    </footer>
  )
}
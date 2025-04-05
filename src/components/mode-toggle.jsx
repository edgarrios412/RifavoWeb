import { Moon, Sun } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
 
export function ModeToggle() {
  const { setTheme, theme } = useTheme()
 
  return (
    <Button
  className="flex items-center gap-2 px-4 py-2 w-fit transition-colors duration-300"
  variant="outline"
  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
>
  {/* Contenedor para íconos */}
  <div className="relative w-5 h-5">
    <Moon className="absolute inset-0 h-5 w-5 transition-transform duration-300 ease-in-out dark:rotate-90 dark:scale-0" />
    <Sun className="absolute inset-0 h-5 w-5 rotate-90 scale-0 transition-transform duration-300 ease-in-out dark:rotate-0 dark:scale-100" />
  </div>
  {theme == "light" ? <span>Modo oscuro</span> : <span>Modo claro</span>}
</Button>
  )
}
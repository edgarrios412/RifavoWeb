import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import icon from "/me2.png"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import SVG from "/marca.svg"
import Rifavo from "../icons/branding/Rifavo"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CalendarDays, History, LogOut, QrCode, Ticket, User } from "lucide-react"
import { DownloadTableExcel } from "react-export-table-to-excel"

const NavBar = () => {

    const [login, setLogin] = useState(true)
    const [isLogged, setIsLogged] = useState(true)
    const [isOpen, setIsOpen] = useState(0)
    const tableRef = useRef()
    const [recovery, setRecovery] = useState(false)

    useEffect(() => {
        console.log(tableRef)
    }, [tableRef.current])

    return (
        <>
            <Dialog open={isOpen == 1} onOpenChange={() => setIsOpen(0)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Mi perfil</DialogTitle>
                        <DialogDescription>Edita tus datos o actualizalos de forma rápida</DialogDescription>
                    </DialogHeader>
                    <h2>En construcción</h2>
                </DialogContent>
            </Dialog>
            <Dialog open={isOpen == 2} onOpenChange={() => setIsOpen(0)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Mis compras</DialogTitle>
                        <DialogDescription>Mira tu historial de compras y tus tickets pendientes</DialogDescription>
                    </DialogHeader>
                    <Table ref={tableRef}>
                        {/* <TableCaption>La lista se actualiza cada hora</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Sorteo</TableHead>
                                <TableHead>Numeros</TableHead>
                                <TableHead>Ganador</TableHead>
                                <TableHead className="text-right">Monto</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow key={1}>
                                <TableCell className="font-medium">000001</TableCell>
                                <TableCell>
                                    <p>001</p>
                                </TableCell>
                                <TableCell className="underline cursor-pointer">
                                    <HoverCard>
                                        <HoverCardTrigger className="">
                                            <p className="underline cursor-pointer font-bold">
                                                159
                                            </p>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-80" side="top">
                                            <div className="flex justify-start gap-4">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/vercel.png" />
                                                    <AvatarFallback>VC</AvatarFallback>
                                                </Avatar>
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-semibold">
                                                        Edg*** Vil***
                                                    </h4>
                                                    <p className="text-sm">
                                                        edg*******@gmail.com
                                                    </p>
                                                    <div className="flex items-center pt-2">
                                                        <CalendarDays className="mr-1 h-4 w-4 opacity-70" />{" "}
                                                        <span className="text-xs text-muted-foreground">
                                                            Se dio el ganador el{" "}04/12/24
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center pt-1">
                                                        <Ticket className="mr-1 h-4 w-4 opacity-70" />{" "}
                                                        <span className="text-xs text-muted-foreground">
                                                            Lotería de Boyacá
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard></TableCell>
                                <TableCell className="text-right">270.000 COP</TableCell>
                            </TableRow>
                            <TableRow key={2}>
                                <TableCell className="font-medium">000001</TableCell>
                                <TableCell>
                                    <p>001</p>
                                </TableCell>
                                <TableCell className="underline cursor-pointer">
                                    <HoverCard>
                                        <HoverCardTrigger className="">
                                            <p className="underline cursor-pointer font-bold">
                                                159
                                            </p>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-80" side="top">
                                            <div className="flex justify-start gap-4">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/vercel.png" />
                                                    <AvatarFallback>VC</AvatarFallback>
                                                </Avatar>
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-semibold">
                                                        Edg*** Vil***
                                                    </h4>
                                                    <p className="text-sm">
                                                        edg*******@gmail.com
                                                    </p>
                                                    <div className="flex items-center pt-2">
                                                        <CalendarDays className="mr-1 h-4 w-4 opacity-70" />{" "}
                                                        <span className="text-xs text-muted-foreground">
                                                            Se dio el ganador el{" "}04/12/24
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center pt-1">
                                                        <Ticket className="mr-1 h-4 w-4 opacity-70" />{" "}
                                                        <span className="text-xs text-muted-foreground">
                                                            Lotería de Boyacá
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard></TableCell>
                                <TableCell className="text-right">270.000 COP</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div>
                        <DownloadTableExcel
                            currentTableRef={tableRef.current}
                            filename="Mis_Compras_Rifavo"
                            sheet="tickets"
                        >
                            <Button>Descargar excel</Button>
                        </DownloadTableExcel>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={isOpen == 3} onOpenChange={() => setIsOpen(0)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Verificar ticket</DialogTitle>
                        <DialogDescription>Ingresa el ID del ticket para verificar su validez</DialogDescription>
                    </DialogHeader>
                    <Input placeholder="ID del ticket" />
                    <Button>Verificar validez</Button>
                </DialogContent>
            </Dialog>
            <div className="fixed w-full h-20 flex items-center px-10 lg:px-40 justify-between bg-white bg-opacity-95 z-10">
                <div className="h-full w-32 sm:w-40 flex items-center">
                    <Rifavo />
                </div>
                {isLogged ?
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar role="button">
                                <AvatarImage className="bg-white" src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 font-[OpenSans]">
                            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup onClick={() => setIsOpen(1)}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Perfil</span>
                                    {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuGroup onClick={() => setIsOpen(2)}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Ticket className="mr-2 h-4 w-4" />
                                    <span>Mis compras</span>
                                    {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuGroup onClick={() => setIsOpen(3)}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <QrCode className="mr-2 h-4 w-4" />
                                    <span>Verificar ticket</span>
                                    {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setIsLogged(false)} className="cursor-pointer hover:!bg-red-200">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Cerrar sesion</span>
                                {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> : <Dialog>
                        <DialogTrigger>
                            <Button className="bg-gradient-to-r from-orange-500 to-red-500">Ingresa ahora</Button>
                        </DialogTrigger>
                        {login ? (recovery ? <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Recupera tu cuenta</DialogTitle>
                                <DialogDescription>Ingresa tu correo y te enviaremos una contraseña nueva</DialogDescription>
                            </DialogHeader>
                            <Input placeholder="Correo electrónico" />
                            <div className="flex gap-3">
                            <Button onClick={() => setRecovery(false)}>Volver</Button>
                            <Button onClick={() => alert("Logica para enviar correo con nueva contraseña")}>Enviar correo</Button>
                            </div>
                        </DialogContent> : <DialogContent>
                            {/* LOGIN */}
                            <DialogHeader>
                                <DialogTitle>Ingresar</DialogTitle>
                                <DialogDescription>Ingresa tus datos para acceder a tu cuenta</DialogDescription>
                            </DialogHeader>
                            <div>
                                <Label>Correo</Label>
                                <Input placeholder="Ingresa tu correo electronico" />
                            </div>
                            <div>
                                <Label>Contraseña</Label>
                                <Input placeholder="Ingresa tu contraseña" type="password" />
                            </div>
                            <p onClick={() => setRecovery(true)} className="text-sm cursor-pointer hover:underline">Olvidé mi contraseña</p>
                            <Button className="bg-orange-400">Ingresar</Button>
                            <Button onClick={() => setLogin(false)}>Aún no tengo cuenta</Button>
                        </DialogContent>) : <DialogContent>
                            {/* REGISTRO */}
                            <DialogHeader>
                                <DialogTitle>Registro</DialogTitle>
                                <DialogDescription>Ingresa tus datos para registrar una cuenta nueva</DialogDescription>
                            </DialogHeader>
                            <div>
                                <Label>Correo</Label>
                                <Input placeholder="Ingresa tu correo electronico" />
                            </div>
                            <div>
                                <Label>Contraseña</Label>
                                <Input placeholder="Ingresa tu contraseña" type="password" />
                            </div>
                            <div>
                                <Label>Repetir contraseña</Label>
                                <Input placeholder="Repite tu contraseña" type="password" />
                            </div>
                            <Button className="bg-orange-400">Registrarme</Button>
                            <Button onClick={() => setLogin(true)}>Ya tengo cuenta</Button>
                        </DialogContent>}
                    </Dialog>}
            </div>
        </>
    )
}

export default NavBar
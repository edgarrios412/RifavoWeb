import { useContext, useEffect, useRef, useState } from "react"
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
import { ArrowDownToLine, CalendarDays, Cctv, History, LogOut, QrCode, Ticket, Trophy, Users } from "lucide-react"
import { DownloadTableExcel } from "react-export-table-to-excel"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { Separator } from "../ui/separator"
import { obfuscateEmail, obfuscateName } from "@/utils/helpers/obfuscated"
import { toast } from "../ui/use-toast"
import { PDFDownloadLink } from "@react-pdf/renderer"
import ReciboDePago from "../../pages/plantillas/ReciboDePago"
// import GoogleLogin from "react-google-login"
import { gapi } from "gapi-script"
import { ModeToggle } from "../mode-toggle"
import RifavoLight from "../icons/branding/RifavoLight"
import { useNavigate } from "react-router-dom"
import QRCode from "react-qr-code"
import { toDataURL } from "qrcode"
import { pdf } from '@react-pdf/renderer';

const NavBar = () => {
    const [qrCodes, setQrCodes] = useState({});
    const clientId = "934325083803-p97gi9ef7ckittt88mep8egc5rpfttkb.apps.googleusercontent.com"
    const [showBalance, setShowBalance] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (sending && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            // Limpiar el intervalo cuando el tiempo se agote
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            // Si el tiempo se acaba, puedes cambiar el estado a algo como "Reintentar" o deshabilitar el botón
            setSending(false);
        }
    }, [sending, timeLeft]);

    const generateQRCode = async (ticketId) => {
        if (qrCodes[ticketId]) return qrCodes[ticketId]; // Si ya existe, retorna el Data URL
        const qrDataURL = await toDataURL(ticketId.toString());
        setQrCodes((prev) => ({ ...prev, [ticketId]: qrDataURL }));
        return qrDataURL;
    };

    const handleDownloadPDF = async (ticket) => {
        const qrCode = await generateQRCode(`https://rifavo.com/verificarTicket/${ticket.id}`);
        const pdfDocument = <ReciboDePago ticket={ticket} qrCode={qrCode} />;

        // Generar el Blob del PDF usando `pdf`
        const pdfBlob = await pdf(pdfDocument).toBlob();

        // Crear enlace de descarga
        const downloadLink = document.createElement('a');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        downloadLink.href = pdfUrl;
        downloadLink.download = `reciboTicket${ticket.id}.pdf`;
        downloadLink.click();
        URL.revokeObjectURL(pdfUrl);
    };

    useEffect(() => {
        const start = () => {
            gapi.auth2.init({
                clientId: clientId
            })
        }
        gapi.load("client:auth2", start)
    }, [])

    const [login, setLogin] = useState(true)
    const [isLogged, setIsLogged] = useState(false)
    const [isOpen, setIsOpen] = useState(0)
    const tableRef = useRef()
    const [recovery, setRecovery] = useState(false)
    const [form, setForm] = useState({})
    const [ticketId, setTicketId] = useState("")
    const [ticket, setTicket] = useState(null)
    const navigation = useNavigate()

    const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    const { usuario, setUsuario } = useContext(UserContext)

    const handleForm = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(tableRef)
    }, [tableRef.current])

    const authenticate = () => {
        axios.post("/user/auth", form).then(({ data }) => {
            setUsuario(data.user)
            localStorage.setItem("token", data.token)
        }, (e) => toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: e.response.data,
        }))
        setIsOpen(0)
    }

    const recoveryPassword = () => {
        setSending(true);
        // Restablecer el tiempo cuando se inicie el proceso
        setTimeLeft(30);
        axios.post("/user/recovery/password", { email: form.email }).then(({ data }) => toast({
            title: "Correo enviado",
            description: data
        }), (e) => {
            return toast({
                variant: "destructive",
                title: "Ha ocurrido un error",
                description: e.response.data,
            })
        })
    }

    const registroUsuario = () => {
        const ref = localStorage.getItem("ref") || null
        if (form.password !== form.password2) return toast({
            variant: "destructive",
            title: "Las contraseñas no coinciden",
            description: "Asegurate de escribir la contraseña correctamente en ambos inputs",
        })
        if (!form.name?.length || !form.lastname?.length || !form.phone?.length || !form.email?.length) return toast({
            variant: "destructive",
            title: "Campos incompletos",
            description: "Debes rellenar todos los campos para poder registrarte",
        })
        if (form.name.length < 4) return toast({
            variant: "destructive",
            title: "Campos incompletos",
            description: "El nombre debe tener más de 3 caracteres",
        })
        if (form.lastname.length < 3) return toast({
            variant: "destructive",
            title: "Campos incompletos",
            description: "El apellido debe tener más de 3 caracteres",
        })
        if (form.phone.length != 10) return toast({
            variant: "destructive",
            title: "Campos incompletos",
            description: "Debes ingresar un numero de telefono válido, ejemplo: 3201234567",
        })
        if (!regexMail.test(form.email)) return toast({
            variant: "destructive",
            title: "Campos incompletos",
            description: "Debes ingresar un correo electrónico válido",
        })
        if (form.password.length < 8) return toast({
            variant: "destructive",
            title: "Campos incompletos",
            description: "La contraseña debe tener al menos 8 caracteres",
        })
        axios.post("/user", { ...form, father: ref, firstDiscount: ref ? true : false }).then(({ data }) => {
            setLogin(true)
            toast({
                title: "Registro exitoso",
                description: "Ya puedes acceder a tu cuenta",
            })
        }, (e) => toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: e.response.data,
        }))
    }

    const validarTicket = () => {
        axios.get(`/sorteo/buscar/ticket/${ticketId}`).then(({ data }) => setTicket(data), (e) => toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: e.response.data,
        }))
    }

    const ingresarConGoogle = (response) => {
        console.log(response)
        axios.post("/user/auth", { email: response.profileObj.email, password: response.googleId }).then(({ data }) => {
            setUsuario(data.user)
            localStorage.setItem("token", data.token)
        }, (e) => toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: e.response.data,
        }))
        setIsOpen(0)
    }

    const registrarConGoogle = (response) => {
        console.log(response)
        axios.post("/user", {
            email: response.profileObj.email,
            password: response.googleId,
            name: response.profileObj.name,
            lastname: "",
            phone: "",
        }).then(({ data }) => {
            setIsOpen(0)
            toast({
                title: "Registro exitoso",
                description: "Tu registro con Google ha sido exitoso",
            })
            ingresarConGoogle(response)
        }, (e) => toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: e.response.data,
        }))
    }

    const copiarAlPortapapeles = async (texto) => {
        try {
            await navigator.clipboard.writeText(texto);
            toast({
                variant: "default",
                duration: 2500,
                title: "Texto copiado exitosamente",
            })
            // Enviar alerta
        } catch (error) {
            console.error("Error al copiar al portapapeles: ", error);
            toast({
                variant: "destructive",
                title: "Ha ocurrido un error",
                description: "No se pudo copiar al portapapeles",
            })
            // Enviar error
        }
    };

    const formatNumber = (num) => {
        // Usamos la configuración regional de España ('es-ES') para obtener el formato deseado
        const formatter = new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: 2, // Para tener siempre 2 decimales
            maximumFractionDigits: 2, // Limitar a 2 decimales
        });

        return formatter.format(num);
    };

    useEffect(() => {
        setShowBalance(false)
    }, [isOpen])

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
                    <div className="max-h-96 overflow-y-scroll">
                        <Table ref={tableRef}>
                            {/* <TableCaption>La lista se actualiza cada hora</TableCaption> */}
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Sorteo</TableHead>
                                    <TableHead className="w-[100px]">Ticket ID</TableHead>
                                    <TableHead>Numero</TableHead>
                                    <TableHead>Ganador</TableHead>
                                    {/* <TableHead className="text-right">Monto</TableHead> */}
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {usuario?.tickets?.map((t, i) => <TableRow key={i}>
                                    <TableCell className="font-medium">{t.sorteo.premio1}</TableCell>
                                    <TableCell className="font-medium">{t.id}</TableCell>
                                    <TableCell>
                                        <p>{(t.numero.toString()).padStart(3, "0")}</p>
                                    </TableCell>
                                    {t.sorteo.numTicketGanadorP1 ? <TableCell className="underline cursor-pointer">
                                        <HoverCard>
                                            <HoverCardTrigger className="">
                                                <p className="underline cursor-pointer font-bold">
                                                    {t.sorteo.numTicketGanadorP1}
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
                                                            {obfuscateName(t?.sorteo?.ganadores?.find(g => g.premioNumero == 1)?.user?.name)} {obfuscateName(t?.sorteo?.ganadores?.find(g => g.premioNumero == 1)?.user?.lastname)}
                                                        </h4>
                                                        <p className="text-sm">
                                                            {obfuscateEmail(t?.sorteo?.ganadores?.find(g => g.premioNumero == 1)?.user?.email)}
                                                        </p>
                                                        <div className="flex items-center pt-2">
                                                            <CalendarDays className="mr-1 h-4 w-4 opacity-70" />{" "}
                                                            <span className="text-xs text-muted-foreground">
                                                                Se dio el ganador el{" "}{t.sorteo.fechaSorteo}
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
                                        </HoverCard>
                                    </TableCell> : <TableCell className="text-slate-500"><p>Aún no hay ganador</p></TableCell>}
                                    {/* <TableCell className="text-right">{Number(t.sorteo.precioTicket).toLocaleString()} COP</TableCell> */}
                                    <TableCell>
                                        <Button onClick={() => handleDownloadPDF(t)}>
                                            <ArrowDownToLine className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        {/* <DownloadTableExcel
                            currentTableRef={tableRef.current}
                            filename="Mis_Compras_Rifavo"
                            sheet="tickets"
                        >
                            <Button>Descargar excel</Button>
                        </DownloadTableExcel> */}
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={isOpen == 3} onOpenChange={() => setIsOpen(0)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Verificar ticket</DialogTitle>
                        <DialogDescription>Ingresa el ID del ticket para verificar su validez</DialogDescription>
                    </DialogHeader>
                    <Input onChange={(e) => setTicketId(e.target.value)} value={ticketId} placeholder="ID del ticket" />
                    <Button onClick={validarTicket}>Verificar validez</Button>
                    {ticket && <><Separator /><div className="flex justify-start gap-4">
                        <Avatar>
                            <AvatarImage src="https://github.com/vercel.png" />
                            <AvatarFallback>VC</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold">
                                {obfuscateName(ticket?.user?.name) + " " + obfuscateName(ticket?.user?.lastname)}
                            </h4>
                            <p className="text-sm">
                                {obfuscateEmail(ticket?.user?.email)}
                            </p>
                            <div className="flex items-center pt-2">
                                <CalendarDays className="mr-1 h-4 w-4 opacity-70" />{" "}
                                <span className="text-xs text-muted-foreground">
                                    {!ticket.sorteo.numTicketGanadorP1 ? `El sorteo se realizará el ${ticket.sorteo.fechaSorteo}` : `Se dio el ganador el ${ticket.sorteo.fechaSorteo}`}
                                </span>
                            </div>
                            <div className="flex items-center pt-1">
                                <Ticket className="mr-1 h-4 w-4 opacity-70" />{" "}
                                <span className="text-xs text-muted-foreground">
                                    {String(ticket.numero).padStart(3, "0")}
                                </span>
                            </div>
                        </div>
                    </div>
                        <div>
                            <p className="font-bold">Detalles del sorteo</p>
                            <p className="text-normal mt-2">{ticket.sorteo.premio1}</p>
                            <p className="text-sm mt-1 text-slate-500">{ticket.sorteo.mindesc}</p>
                            <div className="flex items-center pt-1 mt-2">
                                <Trophy color="orange" className="mr-1 h-4 w-4" />{" "}
                                <span className="text-normal font-bold">
                                    {!ticket.sorteo.numTicketGanadorP1 ? "Aún no hay ganador" : <HoverCard>
                                        <HoverCardTrigger><b className="underline">{ticket.sorteo.numTicketGanadorP1}</b></HoverCardTrigger>
                                        <HoverCardContent>
                                            <div className="flex justify-start gap-4">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/vercel.png" />
                                                    <AvatarFallback>VC</AvatarFallback>
                                                </Avatar>
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-semibold">
                                                        {obfuscateName(ticket.sorteo.ganadores.find(g => g.ticket.numero == ticket.sorteo.numTicketGanadorP1)?.user?.name) + " " + obfuscateName(ticket.sorteo.ganadores.find(g => g.ticket.numero == ticket.sorteo.numTicketGanadorP1)?.user?.lastname)}
                                                        {/* {obfuscateName(ticket?.user?.name) + " " + obfuscateName(ticket?.user?.lastname)} */}
                                                    </h4>
                                                    <p className="text-sm">
                                                        {obfuscateEmail(ticket.sorteo.ganadores.find(g => g.ticket.numero == ticket.sorteo.numTicketGanadorP1)?.user?.email)}
                                                        {/* {obfuscateEmail(ticket?.user?.email)} */}
                                                    </p>
                                                </div>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>}
                                </span>
                            </div>
                            <div className="flex items-center pt-1 mt-2">
                                <Trophy color="gray" className="mr-1 h-4 w-4" />{" "}
                                <span className="text-normal font-bold">
                                    {!ticket.sorteo.numTicketGanadorP2 ? "Aún no hay ganador" : <HoverCard>
                                        <HoverCardTrigger><b className="underline">{ticket.sorteo.numTicketGanadorP2}</b></HoverCardTrigger>
                                        <HoverCardContent>
                                            <div className="flex justify-start gap-4">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/vercel.png" />
                                                    <AvatarFallback>VC</AvatarFallback>
                                                </Avatar>
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-semibold">
                                                        {obfuscateName(ticket.sorteo.ganadores.find(g => g.ticket.numero == ticket.sorteo.numTicketGanadorP2)?.user?.name) + " " + obfuscateName(ticket.sorteo.ganadores.find(g => g.ticket.numero == ticket.sorteo.numTicketGanadorP2)?.user?.lastname)}
                                                        {/* {obfuscateName(ticket?.user?.name) + " " + obfuscateName(ticket?.user?.lastname)} */}
                                                    </h4>
                                                    <p className="text-sm">
                                                        {obfuscateEmail(ticket.sorteo.ganadores.find(g => g.ticket.numero == ticket.sorteo.numTicketGanadorP2)?.user?.email)}
                                                        {/* {obfuscateEmail(ticket?.user?.email)} */}
                                                    </p>
                                                </div>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>}
                                </span>
                            </div>
                            <div className="flex items-center pt-1 mt-2">
                                <Trophy color="brown" className="mr-1 h-4 w-4" />{" "}
                                <span className="text-normal font-bold">
                                    {!ticket.sorteo.numTicketGanadorP3 ? "Aún no hay ganador" : <HoverCard>
                                        <HoverCardTrigger><b className="underline">{ticket.sorteo.numTicketGanadorP3}</b></HoverCardTrigger>
                                        <HoverCardContent>
                                            <div className="flex justify-start gap-4">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/vercel.png" />
                                                    <AvatarFallback>VC</AvatarFallback>
                                                </Avatar>
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-semibold">
                                                        {obfuscateName(ticket.sorteo.ganadores.find(g => g.ticket.numero == ticket.sorteo.numTicketGanadorP3)?.user?.name) + " " + obfuscateName(ticket.sorteo.ganadores.find(g => g.ticket.numero == ticket.sorteo.numTicketGanadorP3)?.user?.lastname)}
                                                        {/* {obfuscateName(ticket?.user?.name) + " " + obfuscateName(ticket?.user?.lastname)} */}
                                                    </h4>
                                                    <p className="text-sm">
                                                        {obfuscateEmail(ticket.sorteo.ganadores.find(g => g.ticket.numero == ticket.sorteo.numTicketGanadorP3)?.user?.email)}
                                                        {/* {obfuscateEmail(ticket?.user?.email)} */}
                                                    </p>
                                                </div>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>}
                                </span>
                            </div>
                        </div></>}
                </DialogContent>
            </Dialog>
            <Dialog open={isOpen == 4} onOpenChange={() => setIsOpen(0)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Referidos</DialogTitle>
                        <DialogDescription>Recibe un 10% de las compras de por vida de tus referidos, y regálale un 10% de descuento de su primera compra</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-row gap-4">
                        <Input onChange={(e) => setTicketId(e.target.value)} value={`https://www.rifavo.com/?ref=${usuario?.id}`} placeholder="ID del ticket" />
                        <Button onClick={() => copiarAlPortapapeles(`https://www.rifavo.com/?ref=${usuario?.id}`)}>Copiar</Button>
                    </div>
                    <div className="flex items-center justify-center p-4">
                        <QRCode value={`https://rifavo.com/?ref=${usuario?.id}`} />
                    </div>
                    <div className="relative">
                        <div
                            className={`bg-gradient-to-r from-green-500 to-green-700 p-4 rounded-lg items-center justify-center flex flex-col transition-all duration-300 ${!showBalance ? 'filter blur-sm' : ''}`}>
                            <p className="font-semibold text-white text-xl">${formatNumber(usuario?.income)} COP</p>
                            <p className="text-white text-sm">Balance disponible</p>
                        </div>

                        {/* Botón para mostrar/ocultar el balance */}
                        <button
                            onClick={() => setShowBalance(!showBalance)}
                            className="absolute top-4 right-4 bg-white text-green-600 px-4 py-2 rounded-lg shadow-md hover:bg-green-500 hover:text-white transition duration-300">
                            {showBalance ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                    <DialogDescription className="text-center">Para realizar un retiro debes comunicarte con el soporte de RIFAVO</DialogDescription>
                </DialogContent>
            </Dialog>
            <div className="fixed w-full h-20 flex items-center px-10 lg:px-40 justify-between bg-white dark:bg-[#262635] bg-opacity-95 z-10">
                <div className="relative flex">
                    <a onClick={() => navigation("/")} className="relative">
                        <div className="absolute invisible sm:visible dark:invisible h-full w-32 sm:w-40 flex items-center">
                            <Rifavo />
                        </div>
                        <div className="absolute invisible sm:dark:visible h-full w-32 sm:w-40 flex items-center">
                            <RifavoLight />
                        </div>
                    </a>
                    <div className="sm:relative sm:left-52">
                        <ModeToggle />
                    </div>
                </div>
                {usuario ?
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
                            {/* <DropdownMenuGroup onClick={() => setIsOpen(1)}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Perfil</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup> */}
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
                            {usuario.role > 0 && <a onClick={() => navigation("/panel")}><DropdownMenuGroup>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Cctv className="mr-2 h-4 w-4" />
                                    <span>Administración </span>
                                    {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                                </DropdownMenuItem>
                            </DropdownMenuGroup></a>}
                            <DropdownMenuGroup onClick={() => setIsOpen(4)}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>Referidos</span>
                                    {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => { setUsuario(null); localStorage.removeItem("token") }} className="cursor-pointer hover:!bg-red-200">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Cerrar sesion</span>
                                {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> : <Dialog>
                        <DialogTrigger>
                            <Button className="bg-gradient-to-r dark:text-white color-white from-orange-500 to-red-500">Ingresa ahora</Button>
                        </DialogTrigger>
                        {login ? (recovery ? <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Recupera tu cuenta</DialogTitle>
                                <DialogDescription>Ingresa tu correo y te enviaremos una contraseña nueva</DialogDescription>
                            </DialogHeader>
                            <Input onChange={handleForm} name="email" value={form?.email} placeholder="Correo electrónico" />
                            <div className="flex gap-3">
                                <Button onClick={() => setRecovery(false)}>Volver</Button>
                                <Button onClick={recoveryPassword} disabled={sending}>
                                    {sending ? `Volver a enviar en 0:${timeLeft < 10 ? '0' : ''}${timeLeft}` : 'Enviar correo'}
                                </Button>
                            </div>
                        </DialogContent> : <DialogContent>
                            {/* LOGIN */}
                            <DialogHeader>
                                <DialogTitle>Ingresar</DialogTitle>
                                <DialogDescription>Ingresa tus datos para acceder a tu cuenta</DialogDescription>
                            </DialogHeader>
                            <div>
                                <Label>Correo</Label>
                                <Input value={form?.email} onChange={handleForm} name="email" placeholder="Ingresa tu correo electronico" />
                            </div>
                            <div>
                                <Label>Contraseña</Label>
                                <Input value={form?.password} onChange={handleForm} name="password" placeholder="Ingresa tu contraseña" type="password" />
                            </div>
                            <p onClick={() => setRecovery(true)} className="text-sm cursor-pointer hover:underline">Olvidé mi contraseña</p>
                            <Button className="" onClick={authenticate}>Ingresar</Button>
                            {/* <GoogleLogin
                                buttonText="Ingresar con Google"
                                clientId={clientId}
                                onSuccess={ingresarConGoogle}
                                cookiePolicy="single_host_policy"
                            /> */}
                            <p className="text-sm">Aún no tienes una cuenta? <span className="hover:underline cursor-pointer" onClick={() => setLogin(false)} >Registrate</span></p>
                            {/* <Button onClick={() => setLogin(false)}>Aún no tengo cuenta</Button> */}
                        </DialogContent>) : <DialogContent>
                            {/* REGISTRO */}
                            <DialogHeader>
                                <DialogTitle>Registro</DialogTitle>
                                <DialogDescription>Ingresa tus datos para registrar una cuenta nueva</DialogDescription>
                            </DialogHeader>
                            <div>
                                <Label>Nombre</Label>
                                <Input value={form?.name} onChange={handleForm} name="name" placeholder="Ingresa tu nombre" />
                            </div>
                            <div>
                                <Label>Apellido</Label>
                                <Input value={form?.lastname} onChange={handleForm} name="lastname" placeholder="Ingresa tu apellido" />
                            </div>
                            <div>
                                <Label>Telefono</Label>
                                <Input value={form?.phone} onChange={handleForm} name="phone" placeholder="Ingresa tu telefono" />
                            </div>
                            <div>
                                <Label>Correo</Label>
                                <Input value={form?.email} onChange={handleForm} name="email" placeholder="Ingresa tu correo electronico" />
                            </div>
                            <div>
                                <Label>Contraseña</Label>
                                <Input value={form?.password} onChange={handleForm} name="password" placeholder="Ingresa tu contraseña" type="password" />
                            </div>
                            <div>
                                <Label>Repetir contraseña</Label>
                                <Input value={form?.password2} onChange={handleForm} name="password2" placeholder="Repite tu contraseña" type="password" />
                            </div>
                            <Button className="" onClick={registroUsuario}>Registrarme</Button>
                            {/* <GoogleLogin
                                buttonText="Registrarme con Google"
                                clientId={clientId}
                                onSuccess={registrarConGoogle}
                                cookiePolicy="single_host_policy"
                            /> */}
                            <p className="text-sm">Ya tienes una cuenta? <span className="hover:underline cursor-pointer" onClick={() => setLogin(true)} >Ingresa</span></p>
                            {/* <Button onClick={() => setLogin(true)}>Ya tengo cuenta</Button> */}
                        </DialogContent>}
                    </Dialog>}
            </div>
        </>
    )
}

export default NavBar
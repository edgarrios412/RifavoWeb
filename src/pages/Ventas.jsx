import { UserContext } from "@/components/context/UserContext"
import { DataTableDemo } from "@/components/layout/TablaUsuarios"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
import { CalendarDays, CheckCircle2, Coins, ScanFace, Ticket, Trophy, Users } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const Ventas = () => {
    const [sorteos, setSorteos] = useState([])
    const [sorteo, setSorteo] = useState(null)
    const { usuario } = useContext(UserContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const [form, setForm] = useState({})

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        axios.get("/sorteo/listar/all").then(({ data }) => setSorteos(data))
    }, [])

    useEffect(() => {
        if (!usuario) return navigate("/")
        if (usuario?.role >= 0) {
            if (usuario?.role < 1) return navigate("/")
            setLoading(false)
        }
    }, [usuario])

    return (
        <>
            {loading ?
                <div className="w-full h-[100vh] gap-2 flex items-center justify-center">
                    <ScanFace />
                    <h1 className="font-bold text-xl">Verificando identidad</h1>
                </div> :
                <div className="bg-slate-100 dark:bg-background">
                    <div className="w-2/3 m-auto min-h-[100vh] h-full pt-40 ">
                        <h1 className="mb-1 font-extrabold text-xl">Hola, Edgar 👋</h1>
                        <h1 className="mb-6 text-slate-600 dark:text-slate-400">Te damos la bienvenida al panel de ventas de RIFAVO, desde acá puedes vender tickets de forma fisica.</h1>
                        <div className="w-full grid grid-cols-3 justify-center gap-10">
                            <div className="w-full h-40 flex flex-col justify-between rounded-sm shadow-sm bg-white dark:bg-slate-800 p-5">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">Saldo</p>
                                    <div className="bg-orange-200 dark:bg-slate-700 w-10 h-10 rounded-[3px] flex justify-center items-center"><Coins className="text-orange-700 dark:text-orange-300" /></div>

                                </div>
                                <p className="font-extrabold text-4xl">$400,000</p>
                                <p className="text-slate-500">Contacta a un admin para recargar</p>
                            </div>
                            {/* <div className="w-full h-40 flex flex-col justify-between rounded-sm shadow-sm bg-white dark:bg-slate-800 p-5">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">Usuarios</p>
                                    <div className="bg-orange-200 dark:bg-slate-700 w-10 h-10 rounded-[3px] flex justify-center items-center"><Users className="text-orange-700 dark:text-orange-300" /></div>
                                </div>
                                <p className="font-extrabold text-4xl">12</p>
                                <p className="text-slate-500"><b>1</b> usuario(s) en linea</p>
                            </div> */}
                            <div className="w-full h-40 flex flex-col justify-between rounded-sm shadow-sm bg-white dark:bg-slate-800 p-5">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">Tickets vendidos</p>
                                    <div className="bg-orange-200 dark:bg-slate-700 w-10 h-10 rounded-[3px] flex justify-center items-center"><Ticket className="text-orange-700 dark:text-orange-300" /></div>

                                </div>
                                <p className="font-extrabold text-4xl">1,200</p>
                                <p className="text-slate-500"><b>324</b> tickets vendidos en la ultima semana</p>
                            </div>
                        </div>
                        <div>
                            <div className="mt-10">
                                <h1 className="font-bold text-2xl">Vender tickets</h1>
                            </div>
                            {sorteo == null ? <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-20 mt-6 pb-10">
                                {sorteos.sort((a, b) => {
                                    if (a.numTicketGanadorP1 === null && b.numTicketGanadorP1 !== null) {
                                        return -1; // 'a' va antes que 'b'
                                    }
                                    if (a.numTicketGanadorP1 !== null && b.numTicketGanadorP1 === null) {
                                        return 1; // 'b' va antes que 'a'
                                    }
                                    return 0; // Si ambos son iguales, no hay cambio
                                }).map(s => <div className="w-80 lg:w-96 rounded-lg shadow-md bg-white dark:bg-[#262635] shadow-slate-200 dark:shadow-gray-900 pb-4">
                                    {s.numTicketGanadorP1 && <div className="text-left m-6 bg-red-400 dark:bg-red-700 w-fit px-5 py-1 rounded-[6px] text-white text-sm"><p>Finalizado</p></div>}
                                    {!s.numTicketGanadorP1 && <div className="text-left m-6 bg-green-500 dark:bg-green-700 w-fit px-5 py-1 rounded-[6px] text-white text-sm"><p>En progreso</p></div>}
                                    <div className="flex items-center justify-center">
                                        <img src={s.image[0]} className="rounded-2xl mx-0 my-6 max-h-72" />
                                    </div>
                                    <div className="text-left px-6">
                                        <h2 className="font-bold text-lg my-2">{s.premio1}</h2>
                                        <p className="text-slate-500 mb-2">{s.mindesc}</p>
                                        {!s.numTicketGanadorP1 && <div className="items-center justify-between my-4">
                                            <Progress value={(s.tickets.length * 100) / (s.cantidadTicket * 0.6)} className="w-[60%] mb-1 bg-gray-100 dark:bg-gray-600" />
                                            {s.cantidadTicket * 0.6 > s.tickets.length ? <p className="text-sm text-slate-500">Faltan <b>{(s.cantidadTicket * 0.6) - s.tickets.length}</b> tickets para iniciar</p>
                                                : <p className="text-sm text-slate-500 flex gap-1 items-center"><CheckCircle2 className="text-green-600 w-4 h-4" /> Sorteo listo para empezar!</p>}
                                        </div>}
                                        <p className={`${s.numTicketGanadorP1 ? "mt-10" : "mt-0"} flex items-center gap-2 font-bold mb-1`}><Ticket className="w-5 h-5" />{Number(s.precioTicket).toLocaleString()} COP</p>
                                        {s.fechaSorteo ? <p className="text-slate-500 text-sm flex items-center gap-2"><CalendarDays className="w-5 h-5 dark:text-white text-black" />{s.fechaSorteo} 10:40PM</p> : <p className="text-slate-500 flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5" /> Se iniciará al vender los tickets</p>}
                                        <Button onClick={() => setSorteo(s.id)} className="my-4 justify-end">Seleccionar</Button>
                                    </div>
                                </div>)}
                            </div> :
                                <div>
                                    <Button onClick={() => setSorteo(null)} className="my-4 justify-end">Volver</Button>
                                    <Input placeholder="Correo electronico" onChange={handleForm} name="email" className="w-80 mt-4" />
                                    <Input placeholder="Telefono (opcional)" onChange={handleForm} name="phone" className="w-80 mt-4" />
                                    <Input placeholder="Ticket numero" onChange={handleForm} name="number" className="w-80 mt-4 mb-4" />
                                    <AlertDialog>
                                        <AlertDialogTrigger><Button>Vender</Button></AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Confirma los datos</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Correo: {form.email}
                                                    <br></br>
                                                    Telefono: {form.phone}
                                                    <br></br>
                                                    Ticket: {form.number}
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction>Confirmar</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            }
                            {/* <Tabs defaultValue="sorteos" className="w-full mt-6 rounded-md mb-8">
                                <TabsList className="w-full bg-gray-200 dark:bg-slate-800">
                                    <TabsTrigger className="w-full" value="sorteos">Sorteos</TabsTrigger>
                                    <TabsTrigger className="w-full" value="usuarios">Usuarios</TabsTrigger>
                                    <TabsTrigger className="w-full" value="configuracion">Configuracion</TabsTrigger>
                                </TabsList>
                                <TabsContent value="sorteos" className="py-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-20">
                                        {sorteos.map(s => <div className="w-80 lg:w-96 rounded-lg shadow-md bg-white dark:bg-[#262635] shadow-slate-200 dark:shadow-gray-900 pb-4">
                                            <img src={s.image[0]} className="rounded-lg px-10 py-4" />
                                            <div className="text-left px-6">
                                                <h2 className="font-bold text-lg my-2">{s.premio1}</h2>
                                                <p className="text-slate-500 mb-2">{s.mindesc}</p>
                                                <div className="items-center justify-between my-4">
                                                    <Progress value={(s.tickets.length * 100) / (s.cantidadTicket * 0.6)} className="w-[60%] mb-1 bg-red-500" />
                                                    {s.cantidadTicket * 0.6 > s.tickets.length ? <p className="text-sm text-slate-500">Faltan <b>{(s.cantidadTicket * 0.6) - s.tickets.length}</b> tickets para iniciar</p>
                                                        : <p className="text-sm text-slate-500 flex gap-1 items-center"><CheckCircle2 className="text-green-600 w-4 h-4" /> Sorteo listo para empezar!</p>}
                                                </div>
                                                <p className="flex items-center gap-2 font-bold mb-1"><Ticket className="w-5 h-5" />{Number(s.precioTicket).toLocaleString()} COP</p>
                                                {s.fechaSorteo ? <p className="text-slate-500 text-sm flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5" />{s.fechaSorteo} 10:40PM</p> : <p className="text-slate-500 flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5" /> Se iniciará al vender los tickets</p>}
                                                <Button className="my-4">Editar</Button>
                                            </div>
                                        </div>)}
                                    </div>
                                </TabsContent>
                                <TabsContent value="usuarios" className="px-10 py-4 mb-0 bg-white dark:bg-background rounded-md">
                                    <DataTableDemo />
                                </TabsContent>
                                <TabsContent value="configuracion" className="px-10 py-4 mb-0 bg-white dark:bg-background rounded-md">
                                    <div>
                                        <h1 className="font-bold text-xl">Espacio en construcción</h1>

                                    </div>
                                </TabsContent>
                            </Tabs> */}
                            {/* <p className="invisible">Hola</p> */}
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default Ventas
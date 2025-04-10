import { UserContext } from "@/components/context/UserContext"
import { DataTableDemo } from "@/components/layout/TablaUsuarios"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@radix-ui/react-dropdown-menu"
import axios from "axios"
import { CalendarDays, CheckCircle2, Coins, MessageCircleWarning, ScanFace, Ticket, Trophy, Users } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const Ventas = () => {
    const [sorteos, setSorteos] = useState([])
    const [sorteo, setSorteo] = useState(null)
    const { usuario, updateUsuario } = useContext(UserContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const [numeros, setNumeros] = useState([]);
    const [numerosComprados, setNumerosComprados] = useState([]);
    const [misNumeros, setMisNumeros] = useState([])
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [numerosPorPagina] = useState(1000); // Número de elementos por página
    const [filter, setFilter] = useState("")

    const filteredNumeros = numeros.filter(index => index.toString().padStart(3, '0').includes(filter));

    useEffect(() => {
        if (sorteo) {
            const numerosArray = Array.from({ length: sorteo.cantidadTicket }, (_, i) => i + 1); // Generar números del 1 al cantidadTicket
            setNumerosComprados(sorteo.tickets.map(t => t.numero))
            setNumeros(numerosArray);
            setCurrentPage(1); // Reiniciar la página a 1 al cambiar el sorteo
            setMisNumeros([])
            setFilter("")
        } else {
            setNumeros([])
            setNumerosComprados([])
            setMisNumeros([])
        }
    }, [sorteo])

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

    const handleNumerosComprados = (index) => {
        setMisNumeros((prevClickedIndexes) =>
            prevClickedIndexes.includes(index)
                ? prevClickedIndexes.filter((i) => i !== index) // Desmarcar si ya está clicado
                : [...prevClickedIndexes, index] // Agregar al array de clicados
        );
    };

    const handleCompra = () => {
        if(form.email === undefined || form.email === "") return toast({ title: "Error", description: "Debes ingresar un correo", variant: "destructive" })
        if (form.phone === undefined || form.phone === "") return toast({ title: "Error", description: "Debes ingresar un telefono", variant: "destructive" })
        if (misNumeros.length < sorteo.multiplo) return toast({ title: "Error", description: `Debes seleccionar ${sorteo.multiplo} tickets`, variant: "destructive" })
        if (misNumeros.length % sorteo.multiplo !== 0) return toast({ title: "Error", description: `Debes seleccionar tickets por multiplos de ${sorteo.multiplo}`, variant: "destructive" })
        axios.post("/sorteo/comprar/ticketsFisico", {
            sorteo:{
                sorteoId: sorteo.id,
                tickets: misNumeros
            },
            user:{
                email: form.email,
                phone: form.phone,
                father: usuario.id,
            },
            monto: (misNumeros.length * sorteo.precioTicket)*0.1,
        }).then(() => {
            updateUsuario()
            axios.get("/sorteo/listar/all").then(({ data }) => setSorteos(data))
            setSorteo(null)
            setMisNumeros([])
            alert("Compra realizada con éxito")
            setNumerosComprados([])
            setNumeros([])
        }, () => alert("Error al realizar la compra"))
    }

    // Lógica para dividir los números en páginas
    const indexOfLastNumber = currentPage * numerosPorPagina; // Último número de la página
    const indexOfFirstNumber = indexOfLastNumber - numerosPorPagina; // Primer número de la página
    const currentNumbers = filteredNumeros.slice(indexOfFirstNumber, indexOfLastNumber); // Números de la página actual

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredNumeros.length / numerosPorPagina);

    return (
        <>
            {loading ?
                <div className="w-full h-[100vh] gap-2 flex items-center justify-center">
                    <ScanFace />
                    <h1 className="font-bold text-xl">Verificando identidad</h1>
                </div> :
                <div className="bg-slate-100 dark:bg-background">
                    <div className="w-2/3 m-auto min-h-[100vh] h-full pt-40 ">
                        <h1 className="mb-1 font-bold text-xl">Hola, Edgar 👋</h1>
                        <h1 className="mb-6 text-slate-600 dark:text-slate-400">Te damos la bienvenida al panel de ventas de RIFAVO, desde acá puedes vender tickets de forma fisica.</h1>
                        <div className="w-full grid grid-cols-3 justify-center gap-10">
                            <div className="w-full h-40 flex flex-col justify-between rounded-sm shadow-sm bg-white dark:bg-slate-800 p-5">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">Saldo</p>
                                    <div className="bg-orange-200 dark:bg-slate-700 w-10 h-10 rounded-[3px] flex justify-center items-center"><Coins className="text-orange-700 dark:text-orange-300" /></div>

                                </div>
                                <p className="font-bold text-4xl">${usuario?.income.toLocaleString()}</p>
                                <p className="text-slate-500">Contacta a un admin para retirar</p>
                            </div>
                            {/* <div className="w-full h-40 flex flex-col justify-between rounded-sm shadow-sm bg-white dark:bg-slate-800 p-5">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">Usuarios</p>
                                    <div className="bg-orange-200 dark:bg-slate-700 w-10 h-10 rounded-[3px] flex justify-center items-center"><Users className="text-orange-700 dark:text-orange-300" /></div>
                                </div>
                                <p className="font-extrabold text-4xl">12</p>
                                <p className="text-slate-500"><b>1</b> usuario(s) en linea</p>
                            </div> */}
                            {/* <div className="w-full h-40 flex flex-col justify-between rounded-sm shadow-sm bg-white dark:bg-slate-800 p-5">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">Tickets vendidos</p>
                                    <div className="bg-orange-200 dark:bg-slate-700 w-10 h-10 rounded-[3px] flex justify-center items-center"><Ticket className="text-orange-700 dark:text-orange-300" /></div>

                                </div>
                                <p className="font-extrabold text-4xl">1,200</p>
                                <p className="text-slate-500"><b>324</b> tickets vendidos en la ultima semana</p>
                            </div> */}
                        </div>
                        <div className="bg-white px-6 py-4 rounded-md mt-10 shadow-sm dark:bg-slate-800 mb-10">
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
                                }).filter(s => !s.numTicketGanadorP1).map(s => <div className="w-80 lg:w-96 rounded-lg shadow-md bg-white dark:bg-[#262635] shadow-slate-200 dark:shadow-gray-900 pb-4">
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
                                        <Button onClick={() => setSorteo(s)} className="my-4 justify-end">Seleccionar</Button>
                                    </div>
                                </div>)}
                            </div> :
                                <div>
                                    <Button onClick={() => setSorteo(null)} className="my-4 justify-end">Volver</Button>
                                    <h2 className="text-3xl font-bold text-center mb-5">Escoge tus numeros</h2>
                                    <Input type="number" placeholder="Busca tu numero ganador" onChange={(e) => { setFilter(e.target.value); setCurrentPage(1) }} />
                                    {
                                        !filteredNumeros.length &&
                                        <div className="flex flex-col items-center min-w-[45rem]">
                                            {/* <Lottie animationData={ani1} style={{ width: "150px", marginTop: "40px" }} loop={true} /> */}
                                            <p key={1} className={`flex items-center justify-center text-center mx-auto mt-4 text-slate-500`}>
                                                No hemos conseguido el número que estás buscando
                                            </p>
                                        </div>
                                    }
                                    <div className="max-h-96 overflow-y-auto overflow-x-hidden select-none mt-10 grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-10 gap-3 items-center">
                                        {currentNumbers.map((index) => {
                                            if (!numerosComprados.includes(index)) {
                                                return (<p onClick={() => handleNumerosComprados(index)} key={index} className={`flex items-center justify-center text-center border rounded-sm w-16 h-10 cursor-pointer hover:border-orange-500 transition ${misNumeros.includes(index) ? 'bg-orange-500 text-white' : 'bg-transparent'}`}>
                                                    {index.toString().padStart(String(sorteo.cantidadTicket).length - 1, '0')}
                                                </p>)
                                            } else {
                                                return (<p key={index} className={`flex items-center justify-center text-center border rounded-sm w-16 h-10 cursor-pointer bg-black text-white`}>
                                                    {index.toString().padStart(String(sorteo.cantidadTicket).length - 1, '0')}
                                                </p>)
                                            }
                                        })}
                                    </div>
                                    {/* Paginación */}
                                    {sorteo.cantidadTicket > 1000 && <div className="flex justify-center items-center mt-6 mb-10">
                                        <button
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 bg-black text-white rounded-sm"
                                        >
                                            Anterior
                                        </button>

                                        <span className="mx-4">
                                            Página {currentPage} de {totalPages}
                                        </span>

                                        <button
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage * numerosPorPagina >= filteredNumeros.length}
                                            className="px-4 py-2 bg-black text-white rounded-sm"
                                        >
                                            Siguiente
                                        </button>
                                    </div>}
                                    {sorteo.multiplo - (misNumeros.length % sorteo.multiplo) != sorteo.multiplo ? <div className="my-10 p-0 rounded-sm flex items-center gap-6 overflow-hidden h-26">
                                        <div className="flex items-center justify-center gap-2">
                                            <MessageCircleWarning />
                                            <p className="bg-red-600 p-4 rounded-sm text-white">Necesitas seleccionar {sorteo.multiplo - (misNumeros.length % sorteo.multiplo)} tickets más</p>
                                        </div>
                                    </div> : (sorteo.multiplo != 1 && <div className="my-10 p-0 rounded-sm flex items-center gap-6 overflow-hidden h-26">
                                        <div className="flex items-center justify-center gap-2">
                                            <CheckCircle2 />
                                            <p className="bg-green-600 p-4 rounded-sm text-white">Te deseamos mucha suerte!</p>
                                        </div>
                                    </div>)}
                                    <Label className="text-slate-500">Correo</Label>
                                    <Input placeholder="Ingresar correo electronico" onChange={handleForm} name="email" className="w-80 mt-0 mb-4" />
                                    <Label className="text-slate-500">Teléfono (opcional)</Label>
                                    <Input placeholder="Ingresar teléfono" onChange={handleForm} name="phone" className="w-80 mt-0 mb-4" />
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
                                                    Ticket(s): {misNumeros.map(n => n.toString().padStart(sorteo.cantidadTicket.toString().length-1, '0')).join(", ")}
                                                    <br></br>
                                                    <br></br>
                                                    A pagar: {(misNumeros.length * sorteo.precioTicket).toLocaleString()} COP
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleCompra()}>Confirmar</AlertDialogAction>
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
                        <h1 className="mt-10 invisible">a</h1>
                    </div>
                </div>}
        </>
    )
}

export default Ventas
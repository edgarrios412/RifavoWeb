import { UserContext } from "@/components/context/UserContext"
import Carrusel from "@/components/layout/Carrusel"
import NavBar from "@/components/layout/NavBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import ani1 from '../../public/animations/empty.json';
import { CalendarDays, ChevronLeft, CreditCard, Ticket, Trophy } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Lottie from "lottie-react"

const SorteoDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    // const [monto, setMonto] = useState(50000)
    const { usuario, setUsuario } = useContext(UserContext)
    const [sorteo, setSorteo] = useState({})
    const numeros = Array.from({ length: sorteo?.cantidadTicket }, (_, index) => index);
    const [numerosComprados, setNumerosComprados] = useState([]);
    const [misNumeros, setMisNumeros] = useState([])
    const [paymentMethod, setPaymentMethod] = useState(0)
    const [form, setForm] = useState({})
    const [filter, setFilter] = useState("")

    const filteredNumeros = numeros.filter(index => index.toString().padStart(3, '0').includes(filter));

    const handleForm = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    // Función para manejar el clic en un párrafo
    const handleNumerosComprados = (index) => {
        setMisNumeros((prevClickedIndexes) =>
            prevClickedIndexes.includes(index)
                ? prevClickedIndexes.filter((i) => i !== index) // Desmarcar si ya está clicado
                : [...prevClickedIndexes, index] // Agregar al array de clicados
        );
    };

    const pagarAhora = () => {
        const monto = misNumeros.length * sorteo.precioTicket
        // setNumerosComprados([...numerosComprados, ...misNumeros])
        // setMisNumeros([])
        const reference = new Date().getTime().toString();
        console.log(reference)
        var checkout = new WidgetCheckout({
            currency: "COP",
            amountInCents: monto + "00",
            reference: reference,
            publicKey: "pub_test_RHtI9AzUsVhum9ryA6Dz43dS2rS3zUFi",
            //   publicKey: "pub_test_w28dxS2v9clmkb8UbFrlkw3GxBUx3bsq",
            redirectUrl: 'http://localhost:5173/perfil'
        });
        console.log(checkout)
        checkout.open(function (result) {
            var transaction = result.transaction;
            console.log(result)
            if (transaction.status == "APPROVED") {
                // SI TODO SALE BIEN ¿QUE HAGO?
                axios.post("/sorteo/comprar/tickets", { tickets: misNumeros, sorteoId: id, userId: usuario?.id })
                    .then(({ data }) => {
                        toast({
                            title: "Transacción exitosa",
                            description: data,
                        }); axios.get(`/sorteo/listar/${id}`).then(({ data }) => { setSorteo(data); setMisNumeros([]); setNumerosComprados(data.tickets.map(t => t.numero)) })
                    })
            } else {
                // SI TODO SALE MAL QUE HAGO
                toast({
                    variant: "destructive",
                    title: "Ha ocurrido un error",
                    description: "Comunicate con el equipo de soporte de ser necesario",
                })
            }
        });
    };

    const procesarPago = () => {
        if (!misNumeros.length) return toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: "Debes seleccionar al menos un numero para pagar",
        })
        if (!paymentMethod) return toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: "Debes seleccionar un metodo de pago",
        })
        if (paymentMethod == 1) {
            pagarAhora()
        } else if (paymentMethod == 2) {
            alert("Logica para pagar por paypal")
        }
    }

    const authenticate = () => {
        axios.post("/user/auth", form).then(({ data }) => {
            setUsuario(data.user)
            localStorage.setItem("token", data.token)
        })
    }

    useEffect(() => {
        axios.get(`/sorteo/listar/${id}`).then(({ data }) => { setSorteo(data); setNumerosComprados(data.tickets.map(t => t.numero)) })
    }, [])

    return (
        <>
            {/* DETALLES DEL SORTEO */}
            <div className="text-start flex flex-col py-24 px-10 lg:px-0 lg:py-0 lg:flex-row items-center justify-center gap-10 lg:gap-40 min-h-[60vh]">
                <Carrusel imagenes={sorteo?.image?.length > 1 ? [...sorteo.image] : [sorteo.image]} />
                <div className="max-w-96">
                    <h2 className="font-bold text-xl my-2 flex gap-4 items-center"><Button onClick={() => navigate("/")} className="flex gap-2"><ChevronLeft className="w-5 h-5" />Volver</Button> {sorteo.premio1}</h2>
                    <p className="text-slate-500 mb-2">{sorteo.desc}</p>
                    <div className="items-center justify-between my-4">
                        <Progress value={(sorteo?.tickets?.length * 100) / (sorteo?.cantidadTicket * 0.6) > 100 ? 100 : (sorteo?.tickets?.length * 100) / (sorteo?.cantidadTicket * 0.6)} className="w-[60%] mb-1" />
                        {sorteo?.cantidadTicket * 0.6 > sorteo?.tickets?.length ? <p className="text-sm text-slate-500">Faltan <b>{(sorteo.cantidadTicket * 0.6) - sorteo.tickets.length}</b> tickets para iniciar</p>
                            : <p className="text-sm text-slate-500">Sorteo listo para empezar!</p>}
                    </div>
                    <p className="flex items-center gap-2 font-bold mb-1"><Ticket className="w-5 h-5" />{Number(sorteo.precioTicket).toLocaleString()} COP</p>
                    {sorteo.fechaSorteo ? <p className="text-slate-500 flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5" />{sorteo.fechaSorteo} 10:40PM</p> : <p className="text-slate-500 flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5" /> Se iniciará al vender los tickets</p>}
                    <div className="mt-10 text-sm">
                        <p className="font-bold mb-2">Terminos y condiciones</p>
                        <p className="text-slate-500">Este sorteo está sujeto a las normas tecnologicas para salvaguardar la identidad de los compradores y ganadores</p>
                    </div>
                </div>
            </div>
            {/* PREMIOS */}
            <div className="text-start flex items-center justify-center bg-slate-50 py-6 flex-col">
                <h2 className="text-[35px] sm:text-[45px] lg:text-[60px] mb-6 font-extrabold">Premios</h2>
                <div className="flex flex-col lg:flex-row items-stretch justify-center gap-20">
                    <div className="flex flex-col justify-between max-w-56 bg-white rounded-lg p-4 shadow-md hover:border-yellow-500 border border-transparent transition cursor-pointer">
                        <div>
                            <p className="font-extrabold text-white bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 animate-gradient-move w-fit px-3 py-1 rounded-sm">
                                ¡Premio Mayor!
                            </p>
                            <h2 className="font-bold text-lg my-2">{sorteo.premio1}</h2>
                            <p className="text-slate-500 mb-2">{sorteo.mindescP1}</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-2 font-bold mb-1"><Ticket className="w-5 h-5" />Lotería de Boyacá</p>
                            {sorteo.fechaSorteo ? <p className="text-slate-500 text-sm flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5" />{sorteo.fechaSorteo} 10:40PM</p> : <p className="text-slate-500 text-sm flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5" /> Se anunciará pronto</p>}
                            {sorteo.numTicketGanadorP1 && <p className="text-slate-500 text-sm flex items-center mt-2 gap-2"><Trophy color="black" className="w-5 h-5" />{sorteo.numTicketGanadorP1}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between max-w-56 bg-white rounded-lg p-4 shadow-md hover:border-gray-500 border border-transparent cursor-pointer transition">
                        <div>
                            <p className="font-extrabold text-white bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 animate-gradient-move w-fit px-3 py-1 rounded-sm">
                                Segundo premio
                            </p>
                            <h2 className="font-bold text-lg my-2">{sorteo.premio2}</h2>
                            <p className="text-slate-500 mb-2">{sorteo.mindescP2}</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-2 font-bold mb-1"><Ticket className="w-5 h-5" />Lotería Cauca</p>
                            {sorteo.fechaSorteo ? <p className="text-slate-500 text-sm flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5" />{sorteo.fechaSorteo} 09:40PM</p> : <p className="text-slate-500 text-sm flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5" /> Se anunciará pronto</p>}
                            {sorteo.numTicketGanadorP2 && <p className="text-slate-500 text-sm flex items-center mt-2 gap-2"><Trophy color="black" className="w-5 h-5" />{sorteo.numTicketGanadorP2}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between max-w-56 bg-white rounded-lg p-4 shadow-md hover:border-yellow-900 border border-transparent cursor-pointer transition">
                        <div>
                            <p className="font-extrabold text-white bg-gradient-to-r from-yellow-900 via-yellow-700 to-yellow-900 animate-gradient-move w-fit px-3 py-1 rounded-sm">
                                Tercer premio
                            </p>
                            <h2 className="font-bold text-lg my-2">{sorteo.premio3}</h2>
                            <p className="text-slate-500 mb-2">{sorteo.mindescP3}</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-2 font-bold mb-1"><Ticket className="w-5 h-5" />Lotería Pijao Noche</p>
                            {sorteo.fechaSorteo ? <p className="text-slate-500 text-sm flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5" />{sorteo.fechaSorteo} 09:00PM</p> : <p className="text-slate-500 text-sm flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5" /> Se anunciará pronto</p>}
                            {sorteo.numTicketGanadorP3 && <p className="text-slate-500 text-sm flex items-center mt-2 gap-2"><Trophy color="black" className="w-5 h-5" />{sorteo.numTicketGanadorP3}</p>}
                        </div>
                    </div>
                </div>
            </div>
            {/* COMPRA DE TICKETS */}
            <div className="my-20 mx-5 lg:mx-0 text-start flex items-center justify-center gap-64 min-h-[60vh]">
                <div>
                    <h2 className="text-3xl font-bold text-center mb-5">Escoge tus numeros</h2>
                    <Input placeholder="Filtrar tus numeros favoritos" onChange={(e) => setFilter(e.target.value)} />
                    {
                        !filteredNumeros.length && 
                        <div className="flex flex-col items-center">
                        <Lottie animationData={ani1} style={{ width: "150px", marginTop:"40px" }} loop={true} />
                        <p key={1} className={`flex items-center justify-center text-center mx-auto mt-4 text-slate-500`}>
                            No hemos conseguido el número que estás buscando
                        </p>
                        </div>
                    }
                    <div className="max-h-96 overflow-y-auto overflow-x-hidden select-none mt-10 grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-10 gap-3 items-center">
                        {filteredNumeros.map((index) => {
                            if (!numerosComprados.includes(index)) {
                                return (<p onClick={() => handleNumerosComprados(index)} key={index} className={`flex items-center justify-center text-center border rounded-sm w-14 h-10 cursor-pointer hover:border-orange-500 transition ${misNumeros.includes(index) ? 'bg-orange-500 text-white' : 'bg-transparent'}`}>
                                    {index.toString().padStart(3, '0')}
                                </p>)
                            } else {
                                return (<p key={index} className={`flex items-center justify-center text-center border rounded-sm w-16 h-10 cursor-pointer bg-black text-white`}>
                                    {index.toString().padStart(3, '0')}
                                </p>)
                            }
                        })}
                    </div>
                    {/* PAGOS */}
                    {!usuario && <><Separator className="mt-6" />
                        <div className="mt-6 flex flex-col lg:flex-row justify-between">
                            <div>
                                <h2 className="font-bold text-lg mb-4">Ingresa los siguientes datos</h2>
                                <div>
                                    <Label>Nombres y Apellidos</Label>
                                    <Input />
                                </div>
                                <div className="mt-4">
                                    <Label>Correo electrónico</Label>
                                    <Input />
                                </div>
                                <div className="mt-4">
                                    <Label>Cedula de identidad</Label>
                                    <Input />
                                </div>
                                <div className="mt-4">
                                    <Label>Teléfono</Label>
                                    <Input />
                                </div>
                            </div>
                            <div className="py-10 lg:py-0 lg:h-40 flex flex-col items-center justify-between">
                                <Separator className="lg:block hidden" orientation="vertical" />
                                <h1>o</h1>
                                <Separator className="lg:block hidden" orientation="vertical" />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg mb-4">Ingresa a tu cuenta RIFAVO</h2>
                                <div>
                                    <Label>Correo electrónico</Label>
                                    <Input onChange={handleForm} name="email" placeholder="Ingresa tu correo" />
                                </div>
                                <div className="mt-4">
                                    <Label>Contraseña</Label>
                                    <Input onChange={handleForm} name="password" type="password" placeholder="Ingresa tu contraseña" />
                                </div>
                                <p className="text-sm mt-3">No tienes cuenta? <span className="cursor-pointer hover:underline">Registrate</span></p>
                                <Button onClick={authenticate} className="w-full mt-5">Ingresar</Button>
                            </div>
                        </div></>}
                    <Separator className="mt-6" />
                    <div className="flex flex-col lg:flex-row lg:mt-6 mt-10 justify-between">
                        <div>
                            <h2 className="font-bold text-lg mb-4">Detalles de la compra</h2>
                            <h3>Has seleccionado {misNumeros.length} numeros</h3>
                            <p className="flex gap-2 items-center"><Ticket className="w-5 h-5" /> {Number(sorteo.precioTicket).toLocaleString()} COP/ticket</p>
                            <p>Total a pagar <b>{(misNumeros.length * sorteo.precioTicket).toLocaleString()} COP</b></p>
                            <p className="text-sm text-slate-500 mt-4 max-w-72">Al pagar se enviará un comprobante a tu correo de los números que has adquirido</p>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg mt-10 lg:mt-0 mb-4">Metódo de pago</h2>
                            <div className="flex gap-6">
                                <img onClick={() => setPaymentMethod(1)} src="https://wompi.com/assets/img/metadatos/WompiLogo.png" className={`w-32 rounded-lg border border-transparent hover:grayscale-0 ${paymentMethod == 1 ? "grayscale-0" : "grayscale"} transition cursor-pointer`} />
                                <img onClick={() => setPaymentMethod(2)} src="https://logos-world.net/wp-content/uploads/2020/08/PayPal-Logo.jpg" className={`w-32 rounded-lg border border-transparent hover:grayscale-0 ${paymentMethod == 2 ? "grayscale-0" : "grayscale"} transition cursor-pointer`} />
                            </div>
                            <Button className="w-full mt-5" onClick={procesarPago}>
                                <CreditCard className="mx-2 w-5" />
                                Pagar ahora
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SorteoDetail
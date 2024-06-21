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
import winner from '../../public/animations/winner.json';
import { CalendarDays, CheckCircle2, ChevronLeft, CreditCard, Ticket, Trophy } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Lottie from "lottie-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

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
    const [login, setLogin] = useState(true)
    const [hayGanadores, setHayGanadores] = useState(false)
    const [invitado, setInvitado] = useState({})

    const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const env = queryParams.get('env');
    const queryId = queryParams.get('id');

    useEffect(() => {
        if (queryId && usuario) {
            // axios.get("https://api-sandbox.wompi.co/v1/transactions/" + queryId).then(({ data }) => {
            axios.get("https://production.wompi.co/v1/transactions/" + queryId).then(({ data }) => {
                if (data.data.status == "APPROVED") {
                    const numerosComprados = JSON.parse(localStorage.getItem('numerosComprados'));
                    if (numerosComprados) {
                        axios.post("/sorteo/comprar/tickets", { tickets: numerosComprados, sorteoId: id, userId: usuario?.id })
                            .then(({ data }) => {
                                localStorage.removeItem("numerosComprados")
                                toast({
                                    title: "Transacción exitosa",
                                    description: data,
                                }); axios.get(`/sorteo/listar/${id}`).then(({ data }) => { setSorteo(data); setMisNumeros([]); setNumerosComprados(data.tickets.map(t => t.numero)) })
                            })
                    }
                }
            })
        }
    }, [usuario])

    const filteredNumeros = numeros.filter(index => index.toString().padStart(3, '0').includes(filter));

    const handleForm = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleInvitado = (e) => {
        const { name, value } = e.target
        setInvitado({
            ...invitado,
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

    const pagarAhora = async () => {
        const monto = misNumeros.length * sorteo.precioTicket
        // setNumerosComprados([...numerosComprados, ...misNumeros])
        // setMisNumeros([])
        localStorage.setItem('numerosComprados', JSON.stringify(misNumeros));
        const reference = new Date().getTime().toString();
        var cadenaConcatenada = `${reference}${monto}00COPprod_integrity_992AIE1Zwrc2AOmPyYlB1Ajvvi2Aq7Qp`;
        console.log(cadenaConcatenada)
        //Ejemplo
        const encondedText = new TextEncoder().encode(cadenaConcatenada);
        const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        console.log(hashHex)
        var checkout = new WidgetCheckout({
            currency: "COP",
            amountInCents: monto + "00",
            reference: reference,
            publicKey: "pub_test_RHtI9AzUsVhum9ryA6Dz43dS2rS3zUFi",
            redirectUrl: `https://rifavo.com/sorteo/${id}`,
            paymentMethods: ['CARD', 'NEQUI'],
            // publicKey: "pub_prod_GmYXcJr5xCBuR7uNULcUBcYqs54hp4Vf",
            // redirectUrl: `http://localhost:5173/sorteo/${id}`,
            // signature: { integrity: hashHex }
        });
        checkout.open(function (result) {
            var transaction = result.transaction;
            console.log(result)
            if (transaction.status == "APPROVED") {
                // SI TODO SALE BIEN ¿QUE HAGO?
                axios.post("/sorteo/comprar/tickets", { tickets: misNumeros, sorteoId: id, userId: usuario.id })
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

    const registroRapido = async () => {
        if (!invitado.name?.length || !invitado.lastname?.length || !invitado.phone?.length || !invitado.email?.length) return toast({
            variant: "destructive",
            title: "Campos incompletos",
            description: "Debes rellenar todos los campos para poder registrarte",
        })
        if (invitado.name.length < 3) return toast({
            variant: "destructive",
            title: "Campos incompletos",
            description: "El nombre debe tener más de 3 caracteres",
        })
        if (invitado.lastname.length < 3) return toast({
            variant: "destructive",
            title: "Campos incompletos",
            description: "El apellido debe tener más de 3 caracteres",
        })
        if (invitado.phone.length != 10) return toast({
            variant: "destructive",
            title: "Campos incompletos",
            description: "Debes ingresar un numero de telefono válido, ejemplo: 3201234567",
        })
        if (!regexMail.test(invitado.email)) return toast({
            variant: "destructive",
            title: "Campos incompletos",
            description: "Debes ingresar un correo electrónico válido",
        })
        try {
            const { data: password } = await axios.post("/user", invitado);
            alert(password.users)
            const { data } = await axios.post("/user/auth", { email: invitado.email, password: password.users });
            setUsuario(data.user);
            localStorage.setItem("token", data.token);
        } catch (e) {
            return toast({
                variant: "destructive",
                title: "Ha ocurrido un error",
                description: e.response.data,
            })
        }
    }

    const procesarPago = async () => {
        if (!usuario) return toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: "Debes iniciar sesión para realizar una compra",
        })
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
            return toast({
                variant: "destructive",
                title: "Ha ocurrido un error",
                description: "Este metodo de pago estará disponible pronto",
            })
        }
    }

    const authenticate = () => {
        axios.post("/user/auth", form).then(({ data }) => {
            setUsuario(data.user)
            localStorage.setItem("token", data.token)
        }, (e) => toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: e.response.data,
        }))
    }

    const registroUsuario = () => {
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
        axios.post("/user", form).then(({ data }) => {
            setLogin(true)
            toast({
                title: "Registro exitoso",
                description: "Hemos enviado tu contraseña al correo electrónico que colocaste",
            })
        }, (e) => toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: e.response.data,
        }))
    }

    useEffect(() => {
        axios.get(`/sorteo/listar/${id}`).then(({ data }) => { setSorteo(data); setNumerosComprados(data.tickets.map(t => t.numero)); data.numTicketGanadorP1 && setHayGanadores(true) })
    }, [])

    return (
        <>
            <Dialog open={hayGanadores} onOpenChange={setHayGanadores}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tenemos ganadores!</DialogTitle>
                        <DialogDescription>Felicidades a los ganadores, el equipo de RIFAVO se pondrá en contacto con ustedes en breve!</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center my-10">
                        <Lottie animationData={winner} style={{ width: "200px", marginTop: "10px" }} loop={false} />
                        <div>
                            <p className="font-extrabold text-white bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 animate-gradient-move w-fit px-3 py-1 rounded-sm">
                                ¡Premio Mayor!
                            </p>
                            <p className="mt-2">Número ganador <b>{sorteo.numTicketGanadorP1}</b></p>
                            <Separator className="mt-2 mb-3" />
                            <p className="font-extrabold text-white bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 animate-gradient-move w-fit px-3 py-1 rounded-sm">
                                Segundo premio
                            </p>
                            <p className="mt-2">Número ganador <b>{sorteo.numTicketGanadorP2}</b></p>
                            <Separator className="mt-2 mb-3" />
                            <p className="font-extrabold text-white bg-gradient-to-r from-yellow-900 via-yellow-700 to-yellow-900 animate-gradient-move w-fit px-3 py-1 rounded-sm">
                                Tercer premio
                            </p>
                            <p className="mt-2">Número ganador <b>{sorteo.numTicketGanadorP3}</b></p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* DETALLES DEL SORTEO */}
            <div className="text-start flex flex-col py-24 px-10 lg:px-0 lg:py-0 lg:flex-row items-center justify-center gap-10 lg:gap-40 min-h-[60vh]">
                <Carrusel imagenes={sorteo?.image?.length > 1 ? [...sorteo.image] : [sorteo.image]} />
                <div className="max-w-96">
                    <h2 className="font-bold text-xl my-2 flex gap-4 items-center"><Button onClick={() => navigate("/")} className="flex gap-2"><ChevronLeft className="w-5 h-5" />Volver</Button> {sorteo.premio1}</h2>
                    <p className="text-slate-500 mb-2">{sorteo.desc}</p>
                    <div className="items-center justify-between my-4">
                        <Progress value={(sorteo?.tickets?.length * 100) / (sorteo?.cantidadTicket * 0.6) > 100 ? 100 : (sorteo?.tickets?.length * 100) / (sorteo?.cantidadTicket * 0.6)} className="w-[60%] mb-1" />
                        {sorteo?.cantidadTicket * 0.6 > sorteo?.tickets?.length ? <p className="text-sm text-slate-500">Faltan <b>{(sorteo.cantidadTicket * 0.6) - sorteo.tickets.length}</b> tickets para iniciar</p>
                            : <p className="text-sm text-slate-500 flex gap-1 items-center"><CheckCircle2 className="text-green-600 w-4 h-4"/>Sorteo listo para empezar!</p>}
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
            <div className="text-start flex items-center justify-center bg-slate-50 dark:bg-[#14141A] py-6 flex-col">
                <h2 className="text-[35px] sm:text-[45px] lg:text-[60px] mb-6 font-extrabold">Premios</h2>
                <div className="flex flex-col lg:flex-row items-stretch justify-center gap-20">
                    <div className="flex flex-col justify-between max-w-56 bg-white dark:bg-[#262635] shadow-slate-200 dark:shadow-gray-900 rounded-lg p-4 shadow-md hover:border-yellow-500 border border-transparent transition cursor-pointer">
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
                            {sorteo.numTicketGanadorP1 && <p className="text-lg font-bold flex items-center mt-2 gap-2"><Trophy color="orange" className="w-5 h-5" />{sorteo.numTicketGanadorP1}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between max-w-56 bg-white dark:bg-[#262635] shadow-slate-200 dark:shadow-gray-900 rounded-lg p-4 shadow-md hover:border-gray-500 border border-transparent cursor-pointer transition">
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
                            {sorteo.numTicketGanadorP2 && <p className="text-lg font-bold flex items-center mt-2 gap-2"><Trophy color="gray" className="w-5 h-5" />{sorteo.numTicketGanadorP2}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between max-w-56 bg-white dark:bg-[#262635] shadow-slate-200 dark:shadow-gray-900 rounded-lg p-4 shadow-md hover:border-yellow-900 border border-transparent cursor-pointer transition">
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
                            {sorteo.numTicketGanadorP3 && <p className="text-lg font-bold flex items-center mt-2 gap-2"><Trophy color="brown" className="w-5 h-5" />{sorteo.numTicketGanadorP3}</p>}
                        </div>
                    </div>
                </div>
            </div>
            {/* COMPRA DE TICKETS */}
            <div className="my-20 mx-5 lg:mx-0 text-start flex items-center justify-center gap-64 min-h-[60vh]">
                <div>
                    <h2 className="text-3xl font-bold text-center mb-5">Escoge tus numeros</h2>
                    <Input type="number" placeholder="Filtrar tus numeros favoritos" onChange={(e) => setFilter(e.target.value)} />
                    {
                        !filteredNumeros.length &&
                        <div className="flex flex-col items-center min-w-[45rem]">
                            <Lottie animationData={ani1} style={{ width: "150px", marginTop: "40px" }} loop={true} />
                            <p key={1} className={`flex items-center justify-center text-center mx-auto mt-4 text-slate-500`}>
                                No hemos conseguido el número que estás buscando
                            </p>
                        </div>
                    }
                    <div className="max-h-96 overflow-y-auto overflow-x-hidden select-none mt-10 grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-10 gap-3 items-center">
                        {filteredNumeros.map((index) => {
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
                    {/* PAGOS */}
                    {!usuario && <><Separator className="mt-6" />
                        <div className="mt-6 flex flex-col lg:flex-row justify-between">
                            <div>
                                <h2 className="font-bold text-lg mb-4">Ingresa los siguientes datos</h2>
                                <div>
                                    <Label>Nombre</Label>
                                    <Input onChange={handleInvitado} name="name" placeholder="Ingresa tu nombre" />
                                </div>
                                <div className="mt-4">
                                    <Label>Apellido</Label>
                                    <Input onChange={handleInvitado} name="lastname" placeholder="Ingresa tu apellido" />
                                </div>
                                <div className="mt-4">
                                    <Label>Teléfono</Label>
                                    <Input onChange={handleInvitado} name="phone" placeholder="Ingresa tu telefono" />
                                </div>
                                <div className="mt-4">
                                    <Label>Correo electrónico</Label>
                                    <Input onChange={handleInvitado} name="email" placeholder="Ingresa tu correo" />
                                </div>
                                <Button onClick={registroRapido} className="w-full mt-5">Guardar</Button>
                            </div>
                            <div className="py-10 lg:py-0 lg:h-40 flex flex-col items-center justify-between">
                                <Separator className="lg:block hidden" orientation="vertical" />
                                <h1>o</h1>
                                <Separator className="lg:block hidden" orientation="vertical" />
                            </div>
                            {login ? <div>
                                <h2 className="font-bold text-lg mb-4">Ingresa a tu cuenta RIFAVO</h2>
                                <div>
                                    <Label>Correo electrónico</Label>
                                    <Input onChange={handleForm} name="email" placeholder="Ingresa tu correo" />
                                </div>
                                <div className="mt-4">
                                    <Label>Contraseña</Label>
                                    <Input onChange={handleForm} name="password" type="password" placeholder="Ingresa tu contraseña" />
                                </div>
                                {/* <p className="text-sm mt-3">No tienes cuenta? <span className="cursor-pointer hover:underline" onClick={() => setLogin(false)}>Registrate</span></p> */}
                                <Button onClick={authenticate} className="w-full mt-5">Ingresar</Button>
                            </div> :
                                <div>
                                    <h2 className="font-bold text-lg mb-4">Registrate en RIFAVO</h2>
                                    <div className="mt-4">
                                        <Label>Nombre</Label>
                                        <Input onChange={handleForm} name="name" placeholder="Ingresa tu nombre" />
                                    </div>
                                    <div className="mt-4">
                                        <Label>Apellido</Label>
                                        <Input onChange={handleForm} name="lastname" placeholder="Ingresa tu apellido" />
                                    </div>
                                    <div className="mt-4">
                                        <Label>Telefono</Label>
                                        <Input onChange={handleForm} name="phone" placeholder="Ingresa tu telefono" />
                                    </div>
                                    <div className="mt-4">
                                        <Label>Correo electrónico</Label>
                                        <Input onChange={handleForm} name="email" placeholder="Ingresa tu correo" />
                                    </div>
                                    <div className="mt-4">
                                        <Label>Contraseña</Label>
                                        <Input onChange={handleForm} name="password" type="password" placeholder="Ingresa tu contraseña" />
                                    </div>
                                    <div className="mt-4">
                                        <Label>Repetir contraseña</Label>
                                        <Input onChange={handleForm} name="password2" type="password" placeholder="Repite tu contraseña" />
                                    </div>
                                    <p className="text-sm mt-3">Ya tienes cuenta? <span className="cursor-pointer hover:underline" onClick={() => setLogin(true)}>Ingresa</span></p>
                                    <Button onClick={registroUsuario} className="w-full mt-5">Registrarme</Button>
                                </div>}
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
                                {/* <img onClick={() => setPaymentMethod(2)} src="https://d6jhcq8ww79ge.cloudfront.net/wp-content/uploads/2024/01/pay-blk-frame-v-copy-e1706628664480.png" className={`w-32 rounded-lg border border-transparent hover:grayscale-0 ${paymentMethod == 2 ? "grayscale-0" : "grayscale"} transition cursor-pointer`} /> */}
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
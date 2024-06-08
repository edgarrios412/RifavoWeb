import Carrusel from "@/components/layout/Carrusel"
import NavBar from "@/components/layout/NavBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, ChevronLeft, CreditCard, Ticket } from "lucide-react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const SorteoDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    // const [monto, setMonto] = useState(50000)

    const numeros = Array.from({ length: 999 }, (_, index) => index + 1);
    const [numerosComprados, setNumerosComprados] = useState([1, 2, 3]);
    const [misNumeros, setMisNumeros] = useState([])
    const [paymentMethod, setPaymentMethod] = useState(0)

    // Función para manejar el clic en un párrafo
    const handleNumerosComprados = (index) => {
        setMisNumeros((prevClickedIndexes) =>
            prevClickedIndexes.includes(index)
                ? prevClickedIndexes.filter((i) => i !== index) // Desmarcar si ya está clicado
                : [...prevClickedIndexes, index] // Agregar al array de clicados
        );
    };

    const pagarAhora = () => {
        const monto = misNumeros.length * 35000
        setNumerosComprados([...numerosComprados, ...misNumeros])
        setMisNumeros([])
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
                alert("APROBADO")
            } else {
                // SI TODO SALE MAL QUE HAGO
                alert("Error")
            }
        });
    };

    const procesarPago = () => {
        if (!misNumeros.length) return alert("Debes seleccionar al menos un numero para pagar")
        if (!paymentMethod) return alert("Debes seleccionar un método de pago")
        if (paymentMethod == 1) {
            pagarAhora()
        } else if (paymentMethod == 2) {
            alert("Logica para pagar por paypal")
        }
    }

    return (
        <>
            <NavBar />
            {/* DETALLES DEL SORTEO */}
            <div className="text-start flex flex-col py-24 px-10 lg:px-0 lg:py-0 lg:flex-row items-center justify-center gap-10 lg:gap-40 min-h-[60vh]">
                <Carrusel/>
                <div className="max-w-96">
                    <h2 className="font-bold text-xl my-2 flex gap-4 items-center"><Button onClick={() => navigate("/")} className="flex gap-2"><ChevronLeft className="w-5 h-5" />Volver</Button> Moto Suzuki 0KM</h2>
                    <p className="text-slate-500 mb-2">Participa y tendrás la posibilidad de ganar hasta 3 premios exclusivos, no te lo pierdas!</p>
                    <div className="items-center justify-between my-4">
                        <Progress value={74} className="w-[60%] mb-1" />
                        <p className="text-sm text-slate-500">Faltan <b>26</b> tickets para iniciar</p>
                    </div>
                    <p className="flex items-center gap-2 font-bold mb-1"><Ticket className="w-5 h-5" />45,000 COP</p>
                    <p className="text-slate-500 flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5" /> Se iniciará al vender los tickets</p>
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
                            <h2 className="font-bold text-lg my-2">Moto Suzuki 0KM</h2>
                            <p className="text-slate-500 mb-2">Recién salida del concesionario, 0KM y con todos los papeles al día</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-2 font-bold mb-1"><Ticket className="w-5 h-5" />Lotería de Boyacá</p>
                            <p className="text-slate-500 flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5" /> Se anunciará pronto</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between max-w-56 bg-white rounded-lg p-4 shadow-md hover:border-gray-500 border border-transparent cursor-pointer transition">
                        <div>
                            <p className="font-extrabold text-white bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 animate-gradient-move w-fit px-3 py-1 rounded-sm">
                                Segundo premio
                            </p>
                            <h2 className="font-bold text-lg my-2">Iphone X</h2>
                            <p className="text-slate-500 mb-2">128GB de almacenamiento</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-2 font-bold mb-1"><Ticket className="w-5 h-5" />Lotería de Boyacá</p>
                            <p className="text-slate-500 flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5" /> Se anunciará pronto</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between max-w-56 bg-white rounded-lg p-4 shadow-md hover:border-yellow-900 border border-transparent cursor-pointer transition">
                        <div>
                            <p className="font-extrabold text-white bg-gradient-to-r from-yellow-900 via-yellow-700 to-yellow-900 animate-gradient-move w-fit px-3 py-1 rounded-sm">
                                Tercer premio
                            </p>
                            <h2 className="font-bold text-lg my-2">250 USDT</h2>
                            <p className="text-slate-500 mb-2">Se hacen envios a traves de cualquier WALLET</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-2 font-bold mb-1"><Ticket className="w-5 h-5" />Lotería de Boyacá</p>
                            <p className="text-slate-500 flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5" /> Se anunciará pronto</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* COMPRA DE TICKETS */}
            <div className="my-20 mx-5 lg:mx-0 text-start flex items-center justify-center gap-64 min-h-[60vh]">
                <div>
                    <h2 className="text-3xl font-bold text-center">Escoge tus numeros</h2>
                    <div className="max-h-96 overflow-y-scroll select-none mt-10 grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-10 gap-3 items-center">
                        {numeros.map((index) => {
                            if (!numerosComprados.includes(index)) {
                                return (<p onClick={() => handleNumerosComprados(index)} key={index} className={`flex items-center justify-center text-center border rounded-sm w-16 h-10 cursor-pointer hover:border-orange-500 transition ${misNumeros.includes(index) ? 'bg-orange-500 text-white' : 'bg-transparent'}`}>
                                    {index}
                                </p>)
                            } else {
                                return (<p key={index} className={`flex items-center justify-center text-center border rounded-sm w-16 h-10 cursor-pointer bg-black text-white`}>
                                    {index}
                                </p>)
                            }
                        })}
                    </div>
                    {/* PAGOS */}
                    <Separator className="mt-6"/>
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
                        <Separator className="lg:block hidden" orientation="vertical"/>
                        <h1>o</h1>
                        <Separator className="lg:block hidden" orientation="vertical"/>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg mb-4">Ingresa a tu cuenta RIFAVO</h2>
                            <div>
                                <Label>Correo electrónico</Label>
                                <Input />
                            </div>
                            <div className="mt-4">
                                <Label>Contraseña</Label>
                                <Input />
                            </div>
                            <p className="text-sm mt-3">No tienes cuenta? <span className="cursor-pointer hover:underline">Registrate</span></p>
                            <Button className="w-full mt-5">Ingresar</Button>
                        </div>
                    </div>
                    <Separator className="mt-6"/>
                    <div className="flex flex-col lg:flex-row lg:mt-6 mt-10 justify-between">
                        <div>
                            <h2 className="font-bold text-lg mb-4">Detalles de la compra</h2>
                            <h3>Has seleccionado {misNumeros.length} numeros</h3>
                            <p className="flex gap-2 items-center"><Ticket className="w-5 h-5" /> 35.000 COP/ticket</p>
                            <p>Total a pagar <b>{(misNumeros.length * 35000).toLocaleString()} COP</b></p>
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
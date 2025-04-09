import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress"
import { CalendarDays, CheckCircle2, Dices, Facebook, Fingerprint, Gift, Instagram, Ticket, TicketCheck } from "lucide-react";
import Lottie from 'lottie-react';
import ani1 from '../../public/animations/1.json';
import ani3 from '../../public/animations/3.json';
import mujer from "../assets/mujer.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Rifavo from "@/components/icons/branding/Rifavo";
import RifavoLight from "@/components/icons/branding/RifavoLight";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Inicio = () => {

    const navigation = useNavigate()

    const [sorteos, setSorteos] = useState([])

    useEffect(() => {
        axios.get("/sorteo/listar/all").then(({ data }) => setSorteos(data))
    }, [])

    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.2, // Delay entre cada item
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1, y: 0, transition: {
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96],
            }
        },
    };

    const pages = [
        // {title: "Inicio", subtitle:"¡Un sorteo a otro nivel! Participa por un kit de productos Apple con valor total de $230,000", image:"https://content.sorteostec.org/sites/default/files/2025-04/Slider-6%C2%B0-Sorteo-Gana-Ya%5B45%5D.webp", path: "/"},
        {subtitle:"¡Un sorteo a otro nivel! Participa por un kit de productos Apple con valor total de $230,000", image:"https://content.sorteostec.org/sites/default/files/2025-04/Slider%2030%C2%B0%20Sorteo%20AventuraT%20%2820_-4x3%2906.webp", path: "/sorteo/1"}]

    return (
        <>
            <div>
                <Carousel swipeable={false}
  draggable={true}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
//   autoPlay={true}
  autoPlaySpeed={1000}
  keyBoardControl={true}
//   customTransition="all .5"
  transitionDuration={5000}
//   containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
//   deviceType={this.props.deviceType}
//   dotListClass="custom-dot-list-style"
//   itemClass="carousel-item-padding-90-px"
  className="w-full h-[70vh] mt-20" >
    {pages.map((p => <div key={p.path} className="w-full h-[70vh] bg-red-500 flex items-center justify-center text-white text-3xl">
        <img src={p.image} className="w-full h-full absolute z-10" />
        <div className="absolute w-full h-full bg-black opacity-30 z-20"></div>
        <div className="flex flex-col items-center justify-center z-30">
        {p.title && <p className="block font-bold text-4xl">{p.title}</p>}
        {p.subtitle && <p className="mt-6 block items-center text-xl font-semibold w-2/3 text-center">{p.subtitle}</p>}
        {p.path && <Button onClick={() => navigation(p.path)} className="mt-10 text-sm sm:text-lg lg:text-xl px-4 sm:px-6 lg:px-8 py-3 sm:py-5 lg:py-7 bg-gradient-to-r from-orange-500 to-red-500 dark:text-white"><TicketCheck className="mr-2 w-5 h-5" />Participa ahora</Button>}
        </div>
    </div>))}
                </Carousel>
                <div className="flex items-center justify-center h-[100vh] overflow-x-hidden relative overflow-hidden select-none">
                    <div class="orange-blur"></div>
                    <div class="orange-blur2 invisible lg:visible"></div>
                    <div className="absolute xl:w-[600px] lg:w-[500px] md:w-[400px] sm:w-[300px] bottom-0 xl:-right-40 lg:-right-60 invisible lg:visible z-1">
                        <img className="drop-shadow-xl" src={mujer} />
                    </div>
                    <div className="flex flex-col justify-center px-8 sm:px-0 py-4 w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[40%]">
                        <div className="relative">
                            <div className="absolute visible dark:invisible w-72 sm:w-96 my-10">
                                <Rifavo />
                            </div>
                            <div className="invisible dark:visible w-72 sm:w-96 my-10">
                                <RifavoLight />
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-bold">Hoy es el día de tu <span className="font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">SUERTE</span></h1>
                        <p className="mt-4 text text-slate-500 text-normal sm:text-lg">¡Estás a un boleto de cambiar tu vida! 🎉 En RIFAVO, cada participación es una oportunidad de ganar premios increíbles, desde tecnología de última generación hasta experiencias únicas. ¡No esperes más y únete a la emoción!</p>
                        <div className="flex justify-between gap-5 mt-10 z-10">
                            <p className="text-slate-500 text-sm sm:text-base">Mantente al tanto a través de nuestras redes sociales</p>
                            <div className="flex gap-5">
                                <a href="https://web.facebook.com/profile.php?id=61560852461961" target="_blank">
                                    <Facebook />
                                </a>
                                <a href="https://www.instagram.com/sorteos_rifavo/" target="_blank">
                                    <Instagram />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-5 sm:px-20 lg:px-0 text-start flex flex-col-reverse pt-20 py-0 lg:py-24 lg:flex-row items-center justify-evenly max-h-[60vh]">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <h1 className="text-[35px] sm:text-[40px] lg:text-[55px] max-w-[40rem] leading-none font-bold">Conviertete en un feliz <span className="font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 animate-gradient-move inline-block text-transparent bg-clip-text">GANADOR</span></h1>
                        <p className="max-w-[30rem] my-4 text-slate-600 dark:text-slate-300 text-lg">Participa en nuestros sorteos y gana increibles premios <b>¿Que esperas para probar tu suerte?</b></p>
                        {sorteos.filter(s => !s.numTicketGanadorP1)?.length > 0 && <div className="flex items-center gap-3 bg-slate-100 dark:bg-[#262635] border-l-4 border-l-orange-400 rounded-r-sm pl-4 py-3">
                            <Gift className="w-8 h-8" />
                            <div>
                                <p className="font-bold">¡Estás de suerte!</p>
                                <p className="text-slate-500 dark:text-slate-400">Tenemos {sorteos.filter(s => !s.numTicketGanadorP1)?.length} sorteos activos</p>
                            </div>

                        </div>}

                        <a href="#sorteos"><Button className="mt-8 text-sm sm:text-lg lg:text-xl px-4 sm:px-6 lg:px-8 py-3 sm:py-5 lg:py-7 bg-gradient-to-r from-orange-500 to-red-500 dark:text-white"><TicketCheck className="mr-2 w-5 h-5" />Participa ahora</Button></a>
                    </motion.div>
                    <motion.div initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="w-60 mb-10 lg:mb-0 sm:w-96 lg:w-1/3 relative flex justify-center lg:h-[400px]"
                    >
                        <div className="w-full h-full flex justify-center items-center">
                            <Lottie animationData={ani1} style={{ width: "900px" }} loop={true} />
                        </div>
                    </motion.div>
                </div>
                <div id="sorteos" className="text-center flex items-center justify-evenly min-h-[100vh] h-fit bg-slate-50 dark:bg-[#14141A] mt-0 py-20">
                    <div>
                        <h1 className="text-[30px] sm:text-[35px] lg:text-[45px] mb-20 font-bold text-slate-800">Rifas activas</h1>
                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-20">
                            {sorteos.sort((a, b) => {
                                if (a.numTicketGanadorP1 === null && b.numTicketGanadorP1 !== null) {
                                    return -1; // 'a' va antes que 'b'
                                }
                                if (a.numTicketGanadorP1 !== null && b.numTicketGanadorP1 === null) {
                                    return 1; // 'b' va antes que 'a'
                                }
                                return 0; // Si ambos son iguales, no hay cambio
                            }).map((s, i) => <motion.div key={i} variants={item} onClick={() => navigation(`/sorteo/${s.id}`)} className="cursor-pointer hover:shadow-xl transition-all w-80 lg:w-96 rounded-lg shadow-md bg-white dark:bg-[#262635] shadow-slate-200 dark:shadow-gray-900 pb-10">
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
                                    {/* <Button onClick={() => navigation(`/sorteo/${s.id}`)} className="my-4 justify-end">Ver detalle del sorteo</Button> */}
                                </div>
                            </motion.div>)}
                        </motion.div>
                    </div>
                </div>
                {/* <div className="px-0 lg:px-0 text-center flex flex-col py-20 lg:py-0 lg:flex-row items-center justify-center gap-0 lg:gap-20 max-h-fit lg:max-h-[50vh]">
                    <motion.div className="w-60 sm:w-96 lg:w-1/3">
                        <div className="w-full h-full flex justify-center items-center">
                            <Lottie animationData={ani3} style={{ width: "900px" }} loop={true} />
                        </div>
                    </motion.div>
                    <motion.div initial={{ x: 100 }}
                        animate={{ x: 0 }} className="text-end w-full px-5 sm:px-20 lg:px-0 lg:w-1/3">
                        <h1 className="text-[30px] sm:text-[40px] lg:text-[50px] lg:text-end text-center font-bold mb-6">Participar es muy sencillo</h1>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-5 h-96">
                            <div className="flex justify-end items-center gap-5 bg-slate-100 dark:bg-[#262635] border-r-4 border-r-orange-400 rounded-l-sm pr-4 py-3">
                                <div>
                                    <p className="font-bold text-lg">Registrate</p>
                                    <p className="text-slate-500 dark:text-slate-400">Para que podamos diferenciarte entre los demás debes registrarte e ingresar</p>
                                </div>
                                <Fingerprint className="w-8 h-8 sm:block hidden" />
                            </div>
                            <div className="flex justify-end items-center gap-3 bg-slate-100 dark:bg-[#262635] border-r-4 border-r-orange-400 rounded-l-sm pr-4 py-3">
                                <div>
                                    <p className="font-bold text-lg">Compra tus tickets</p>
                                    <p className="text-slate-500 dark:text-slate-400">Adquiere tantos tickets como quieras, mientras más tickets más posibilidad de ganar</p>
                                </div>
                                <Ticket className="w-8 h-8 sm:block hidden" />
                            </div>
                            <div className="flex justify-end items-center gap-3 bg-slate-100 dark:bg-[#262635] border-r-4 border-r-orange-400 rounded-l-sm pr-4 py-3">
                                <div>
                                    <p className="font-bold text-lg">Espera los resultados</p>
                                    <p className="text-slate-500 dark:text-slate-400">Cuando el temporizador del sorteo llegue a 0 se anunciará el ganador!</p>
                                </div>
                                <Dices className="w-8 h-8 sm:block hidden" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div> */}
            </div>
        </>
    )
}

export default Inicio
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from 'framer-motion';
import { Progress } from "@/components/ui/progress"
import icon from "/me2.png"
import iphone from "/iphone.png"
import moto from "/moto.jpg"
import moto2 from "/moto2.png"
import moto3 from "/moto3.png"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownToLine, BookUser, Bot, Brain, BrainCircuit, Brush, CalendarDays, Database, Dices, Fingerprint, Folder, Gift, HelpCircle, Linkedin, Mail, Search, Server, Ticket, TicketCheck } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import Lottie from 'lottie-react';
import ani1 from '../../public/animations/1.json';
import ani2 from '../../public/animations/2.json';
import ani3 from '../../public/animations/3.json';
import BotAyudante from "@/components/layout/BotAyudante";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/layout/NavBar";
import axios from "axios";

const Inicio = () => {

    const [option, setOption] = useState(1)
    const [work, setWork] = useState(1)
    const navigation = useNavigate()

    const [sorteos, setSorteos] = useState([])

    useEffect(() => {
        axios.get("/sorteo/listar/all").then(({data}) => setSorteos(data))
    },[])

    return (
        <>
            <Dialog>
                <DialogTrigger className="fixed bottom-5 right-5 lg:bottom-8 lg:right-8">
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-14 h-14 lg:h-16 lg:w-16"><Bot className="w-8 h-8" /></Button>
                </DialogTrigger>
                <BotAyudante />
            </Dialog>
            <div>
                <div className="px-5 sm:px-20 lg:px-0 text-start flex flex-col-reverse pt-20 py-0 lg:py-64 lg:flex-row items-center justify-evenly min-h-[60vh]">
                    <motion.div initial={{ x: -100 }}
                        animate={{ x: 0 }}
                    >
                        {/* <h4 className="mb-4 font-bold">Participa y gana</h4> */}
                        {/* <h1 className="text-[60px] tracking-widest">PORTFOLIO</h1> */}
                        <h1 className="text-[35px] sm:text-[45px] lg:text-[65px] max-w-[40rem] leading-none font-extrabold">Conviertete en un feliz <span className="font-extrabold bg-gradient-to-r from-orange-500 to-red-500 inline-block text-transparent bg-clip-text">GANADOR</span></h1>
                        <p className="max-w-[30rem] my-4 text-slate-600 text-lg">Participa en nuestros sorteos y gana increibles premios <b>¿Que esperas para probar tu suerte?</b></p>
                        <div className="flex items-center gap-3 bg-slate-100 border-l-4 border-l-orange-400 rounded-r-sm pl-4 py-3">
                            <Gift className="w-8 h-8" />
                            <div>
                                <p className="font-bold">¡Estás de suerte!</p>
                                <p className="text-slate-500">Tenemos 6 sorteos activos</p>
                            </div>

                        </div>

                        <a href="#sorteos"><Button className="mt-8 text-sm sm:text-lg lg:text-xl px-4 sm:px-6 lg:px-8 py-3 sm:py-5 lg:py-7 bg-gradient-to-r from-orange-500 to-red-500"><TicketCheck className="mr-2 w-5 h-5" />Participa ahora</Button></a>
                    </motion.div>
                    <motion.div initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        className="w-60 mb-10 lg:mb-0 sm:w-96 lg:w-1/3 relative flex justify-center lg:h-[400px]"
                    >
                        <div className="w-full h-full flex justify-center items-center">
                            <Lottie animationData={ani1} style={{ width: "900px" }} loop={true} />
                        </div>
                        {/* <img src={webdev} className="absolute"/> */}
                    </motion.div>
                </div>
                <div className="px-0 lg:px-0 text-center flex flex-col py-20 lg:py-0 lg:flex-row items-center justify-center gap-0 lg:gap-20 max-h-fit lg:max-h-[50vh]">
                    <motion.div className="w-60 sm:w-96 lg:w-1/3">
                        <div className="w-full h-full flex justify-center items-center">
                            <Lottie animationData={ani3} style={{ width: "900px" }} loop={true} />
                        </div>
                    </motion.div>
                    <motion.div initial={{ x: 100 }}
                        animate={{ x: 0 }} className="text-end w-full px-5 sm:px-20 lg:px-0 lg:w-1/3">
                        <h1 className="text-[30px] sm:text-[40px] lg:text-[50px] lg:text-end text-center font-bold mb-6">Participar es muy sencillo</h1>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-5 h-96">
                            <div className="flex justify-end items-center gap-5 bg-slate-100 border-r-4 border-r-orange-400 rounded-l-sm pr-4 py-3">
                                <div>
                                    <p className="font-bold text-lg">Registrate</p>
                                    <p className="text-slate-500">Para que podamos diferenciarte entre los demás debes registrar e ingresar</p>
                                </div>
                                <Fingerprint className="w-8 h-8 sm:block hidden" />
                            </div>
                            <div className="flex justify-end items-center gap-3 bg-slate-100 border-r-4 border-r-orange-400 rounded-l-sm pr-4 py-3">
                                <div>
                                    <p className="font-bold text-lg">Compra tus tickets</p>
                                    <p className="text-slate-500">Adquiere tantos tickets como quieras, mientras más tickets más posibilidad</p>
                                </div>
                                <Ticket className="w-8 h-8 sm:block hidden" />
                            </div>
                            <div className="flex justify-end items-center gap-3 bg-slate-100 border-r-4 border-r-orange-400 rounded-l-sm pr-4 py-3">
                                <div>
                                    <p className="font-bold text-lg">Espera los resultados</p>
                                    <p className="text-slate-500">Cuando el temporizados del sorteo llegue a 0 se anunciará el ganador!</p>
                                </div>
                                <Dices className="w-8 h-8 sm:block hidden" />
                            </div>
                            <p className="text-slate-500 flex justify-end gap-1 items-center"><HelpCircle className="w-4 h-4" />Tienes más dudas?</p>
                            <Dialog>
                                <DialogTrigger className="flex justify-end">
                                    <Button className="bg-gradient-to-r from-orange-500 to-red-500"><Bot className="mr-4" />Habla con nuestro BOT</Button>
                                </DialogTrigger>
                                <BotAyudante />
                            </Dialog>
                        </motion.div>
                    </motion.div>
                </div>
                <div id="sorteos" className="text-center flex items-center justify-evenly min-h-[100vh] h-fit bg-slate-50 mt-40 py-20">
                    <div>
                        <h1 className="text-[35px] sm:text-[45px] lg:text-[60px] mb-20 font-extrabold">Sorteos activos</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-20">
                            {sorteos.map(s => <div className="w-80 lg:w-96 rounded-lg shadow-md bg-white shadow-slate-200 pb-4">
                                    <img src={s.image[0]} className="rounded-lg px-10 py-4" />
                                    <div className="text-left px-6">
                                    <h2 className="font-bold text-lg my-2">{s.premio1}</h2>
                                    <p className="text-slate-500 mb-2">{s.mindesc}</p>
                                    <div className="items-center justify-between my-4">
                                    <Progress value={(s.tickets.length*100)/(s.cantidadTicket*0.6)} className="w-[60%] mb-1" />
                                    {s.cantidadTicket*0.6 > s.tickets.length ? <p className="text-sm text-slate-500">Faltan <b>{(s.cantidadTicket*0.6)-s.tickets.length}</b> tickets para iniciar</p>
                                    :<p className="text-sm text-slate-500">Sorteo listo para empezar!</p>}
                                    </div>
                                    <p className="flex items-center gap-2 font-bold mb-1"><Ticket className="w-5 h-5"/>{Number(s.precioTicket).toLocaleString()} COP</p>
                                    {s.fechaSorteo ? <p className="text-slate-500 text-sm flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5"/>{s.fechaSorteo} 10:40PM</p> :<p className="text-slate-500 flex items-center gap-2"><CalendarDays color="black" className="w-5 h-5"/> Se iniciará al vender los tickets</p>}
                                    <Button onClick={() => navigation(`/sorteo/${s.id}`)} className="my-4">Ver detalle del sorteo</Button>
                                    </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inicio
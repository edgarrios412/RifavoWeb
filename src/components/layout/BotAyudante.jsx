import axios from "axios"
import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Bot } from "lucide-react";
import { Button } from "../ui/button";
import icon from "/me2.png"
import other from "/other.jpg"
import RifavoLogo from "../icons/branding/RifavoLogo";

const BotAyudante = () => {

    const [messages, setMessages] = useState([
        {
            role: "assistant", content: `Eres un bot de una web de loteria, tu objetivo es orientar y ayudar
            a las personas, te llamas LotBOT, la página vende tickets para loterías de diferentes articulos
            desde fisicos hasta digitales, en la seccion "Loterias activas" puede ver las loterias que están 
            activas en la plataforma, para participar debe comprar tickets mientras más tickets, más probabilidad
            tendrá de ganar, al comprar un ticket se le envía por correo el comprobante y la hora y fecha que se sorteará
            los metodos de pago aceptados son PSE, Bancolombia y Nequi, para más información abrir un ticket de soporte,
            eres muy amable y respondes brevemente solo lo que te preguntan`}
    ])
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)

    const preguntarAEdgar = () => {
        setLoading(true)
        const message = [...messages, { role: "user", content: msg }]
        setMessages(message)
        setMsg("")
        axios.post("https://aisistente.onrender.com/edgarvilchez", { conversation: message }).then(({ data }) => {
            setLoading(false)
            console.log(data)
            setMessages([...message, { role: "assistant", content: data }])
        })
    }

    return (

        <DialogContent>
            <div className="flex items-center">
                {/* <img src={icon} className="h-10 w-10" /> */}
                <div className="h-10 w-10">
                    <RifavoLogo />
                </div>
                <div className="ml-5">
                    <h2 className="font-bold flex items-center gap-2">Rifavot <span className="bg-green-600 rounded-full w-2 h-2 block"></span></h2>
                    <h3 className="text-slate-500 text-sm">Estoy para resolver tus dudas</h3>
                </div>
            </div>
            <hr></hr>
            <div className="min-h-96 max-h-96 overflow-y-auto">
                {messages.map((m, i) => {
                    if (i == 0) return;
                    if (m.role == "assistant") {
                        return <div className="mb-4 flex gap-5">
                            <div className="h-10 w-10">
                                <RifavoLogo />
                            </div>
                            <p className="bg-gray-100 px-4 py-2 rounded-lg max-w-80">{m.content}</p>
                        </div>
                    } else {
                        return <div className="mb-4 flex justify-end gap-5 px-4">
                            <p className="bg-purple-400 px-4 py-2 rounded-lg text-white">{m.content}</p>
                            <img src={other} className="h-8 w-8 -scale-x-100" />
                        </div>
                    }
                }
                )}
                {loading && <div className="mb-4 flex gap-5">
                    <div className="h-10 w-10">
                        <RifavoLogo />
                    </div>
                    <p className="bg-gray-100 h-10 px-4 py-2 rounded-lg w-20 flex justify-center items-center"><div class="loader"></div></p>
                </div>}
            </div>
            <input onKeyDown={(e) => e.key === 'Enter' && preguntarAEdgar()} placeholder="Haz cualquier pregunta" className="border border-slate-200 rounded-sm px-4 py-2" value={msg} onChange={(e) => setMsg(e.target.value)} type="text" />
        </DialogContent>
        // </Dialog>
    )
}

export default BotAyudante
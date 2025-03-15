import { UserContext } from "@/components/context/UserContext"
import { DataTableDemo } from "@/components/layout/TablaUsuarios"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
import { BadgeCheck, CalendarDays, CheckCircle2, ScanFace, ScanSearch, Ticket, TicketX, Trophy, Users } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


const VerificarTicket = () => {
    const [ticket, setTicket] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const delayRequest = setTimeout(() => {
            axios.get(`/sorteo/buscar/ticket/${id}`)
                .then(({ data }) => setTicket(true), () => setTicket(false))
                .catch((error) => setTicket(false));
        }, 1500); // Retraso de 1.5 segundos (1500 ms)
    
        // Limpiar el timeout si el componente se desmonta antes de la solicitud
        return () => clearTimeout(delayRequest);
    }, [])

    return (
        <>
            {ticket == null && <div className="w-full h-[100vh] gap-2 flex items-center justify-center">
                <ScanSearch />
                <h1 className="font-bold text-xl">Verificando la validez del ticket #{id}</h1>
            </div>}
            {ticket && <div className="w-full h-[100vh] gap-2 flex items-center justify-center text-green-700">
                <BadgeCheck />
                <h1 className="font-bold text-xl">Ticket válido</h1>
            </div>}
            {!ticket && <div className="w-full h-[100vh] gap-2 flex items-center justify-center text-red-700">
                <TicketX />
                <h1 className="font-bold text-xl">Ticket inválido</h1>
            </div>}
        </>
    )
}

export default VerificarTicket
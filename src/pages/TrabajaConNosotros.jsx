import { UserContext } from "@/components/context/UserContext"
import RaspaCard from "@/components/layout/RaspaCard"
import { DataTableDemo } from "@/components/layout/TablaUsuarios"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
import { CalendarDays, CheckCircle2, ScanFace, Ticket, Trophy, Users } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const TrabajaConNosotros = () => {
    const { usuario } = useContext(UserContext);
    const [showBalance, setShowBalance] = useState(true);
    const [currentBalance, setCurrentBalance] = useState(usuario?.income || 0);

    const formatNumber = (num) => {
        const formatter = new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        return formatter.format(num);
    };

    // Animar el cambio de balance
    const animateBalanceChange = (newBalance) => {
        const increment = newBalance > currentBalance ? 1 : -1;
        const step = Math.abs(newBalance - currentBalance) / 100; // 100 pasos para la animación

        let current = currentBalance;
        const interval = setInterval(() => {
            current += increment * step;
            if ((increment > 0 && current >= newBalance) || (increment < 0 && current <= newBalance)) {
                clearInterval(interval);
                setCurrentBalance(newBalance); // Asegurarse de que el valor final sea exacto
            } else {
                setCurrentBalance(Math.round(current)); // Actualizar el balance gradualmente
            }
        }, 10); // Intervalo de animación
    };

    // Cuando el balance de usuario cambia, animar el cambio
    useEffect(() => {
        if (usuario?.income !== undefined) {
            animateBalanceChange(usuario.income);
        }
    }, [usuario?.income]);

    const nuevoSaldo = (monto) => {
        setCurrentBalance(prev => prev + monto);
        animateBalanceChange(currentBalance + monto);
    }

    return (
        <>
            <div className="w-full h-[100vh] gap-2 mt-24 flex-col">
                <div className="bg-gradient-to-r from-white to-orange-200 w-full h-1/2 flex items-center justify-center overflow-hidden">
                <div className="flex flex-col w-1/3">
                    <p className="text-black text-4xl font-extrabold">Trabaja con nosotros</p>
                    <p className="text-slate-600 mt-6">Trabajamos para generar oportunidades que cierren las brechas sociales y construyan un mejor país. Únete a nuestro propósito y descubre cómo tu talento puede hacer la diferencia.</p>
                    <Button className="w-40 mt-4">Contactanos</Button>
                </div>
                    <img src="https://cms.colsubsidio.com/sites/default/files/2024-10/shutterstock_2509555365_0.png" alt="Hiring" className="w-1/3" />
                </div>
                <h1 className="flex items-center justify-center py-10 font-extrabold text-4xl">Beneficios</h1>
                <div className="px-44">
                    <p>Pagos inmediatos</p>
                    <p>Ganancias del 10% de por vida por venta</p>
                    <p>Material publicitario</p>
                    <p>Soporte inmediato</p>
                </div>
            </div>
        </>
    );
};

export default TrabajaConNosotros;
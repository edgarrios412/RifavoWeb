import { UserContext } from "@/components/context/UserContext"
import RaspaCard from "@/components/layout/RaspaCard"
import { DataTableDemo } from "@/components/layout/TablaUsuarios"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
import Lottie from "lottie-react"
import { CalendarDays, CheckCircle2, ScanFace, Ticket, Trophy, Users } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import money from '../../public/animations/money.json';


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
            <div className="w-full gap-2 mt-24 flex-col">
                <div className="bg-gradient-to-r from-white to-orange-200 w-full h-1/2 flex items-center justify-center overflow-hidden">
                    <div className="flex flex-col w-1/3">
                        <p className="text-black text-4xl font-extrabold">Trabaja con nosotros</p>
                        <p className="text-slate-600 mt-6">Trabajamos para generar oportunidades que cierren las brechas sociales y construyan un mejor país. Únete a nuestro propósito y descubre cómo tu talento puede hacer la diferencia.</p>
                        <Button className="w-40 mt-4">Contactanos</Button>
                    </div>
                    <img src="https://cms.colsubsidio.com/sites/default/files/2024-10/shutterstock_2509555365_0.png" alt="Hiring" className="w-1/3" />
                </div>
                <div className="flex flex-row justify-center items-center gap-8 py-32">
                    <Lottie animationData={money} style={{ width: "500px" }} loop={true} />
                    <div className="flex flex-col gap-8 w-1/2">
                        <h1 className="font-extrabold text-4xl">Beneficios</h1>
                        <div className="flex items-start gap-4">
                            <CheckCircle2 color="#31bda6" className="mt-1" size={22} />
                            <div>
                                <p className="text-xl font-bold">Comision 10% por venta</p>
                                <p className="text-slate-600 w-2/3 mt-2">Gana un 10% de comisión por cada venta que realices. Cuanto más vendas, más ganas. ¡Aprovecha esta oportunidad para generar ingresos extra de manera fácil y rápida!</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <CheckCircle2 color="#31bda6" className="mt-1" size={22} />
                            <div>
                                <p className="text-xl font-bold">Soporte inmediato</p>
                                <p className="text-slate-600 w-2/3 mt-2">Nuestro equipo de soporte está disponible para ayudarte en todo momento, garantizando respuestas rápidas y efectivas para que sigas trabajando sin problemas.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <CheckCircle2 color="#31bda6" className="mt-1" size={22} />
                            <div>
                                <p className="text-xl font-bold">Material publicitario</p>
                                <p className="text-slate-600 w-2/3 mt-2">Te proporcionamos todo el material publicitario necesario, desde imágenes hasta textos listos para compartir, para que puedas promocionar las rifas de forma efectiva.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <CheckCircle2 color="#31bda6" className="mt-1" size={22} />
                            <div>
                                <p className="text-xl font-bold">Pagos rápidos</p>
                                <p className="text-slate-600 w-2/3 mt-2">Recibe tus pagos de forma ágil y segura. En RIFAVO, te garantizamos pagos rápidos y puntuales, para que tu esfuerzo sea recompensado sin demoras.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TrabajaConNosotros;
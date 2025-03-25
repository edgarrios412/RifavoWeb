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


const Raspa = () => {
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
            <div className="w-full h-[100vh] gap-2 flex items-center justify-center flex-col">
                <div className="relative w-1/5">
                    <div
                        className={`bg-gradient-to-r from-green-500 to-green-700 p-4 rounded-lg items-center justify-center flex flex-col transition-all duration-300 ${!showBalance ? 'filter blur-sm' : ''}`}>
                        <p className="font-semibold text-white text-xl">
                            ${formatNumber(currentBalance)} COP
                        </p>
                        <p className="text-white text-sm">Balance disponible</p>
                    </div>

                    {/* Botón para mostrar/ocultar el balance */}
                    {/* <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="absolute top-4 right-4 bg-white text-green-600 px-4 py-2 rounded-lg shadow-md hover:bg-green-500 hover:text-white transition duration-300">
                        {showBalance ? 'Ocultar' : 'Mostrar'}
                    </button> */}
                </div>
                <RaspaCard nuevoSaldo={nuevoSaldo}/>
            </div>
        </>
    );
};

export default Raspa;
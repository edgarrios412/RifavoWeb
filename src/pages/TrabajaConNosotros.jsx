import { UserContext } from "@/components/context/UserContext"
import { Button } from "@/components/ui/button"
import Lottie from "lottie-react"
import { CalendarDays, CheckCircle2, ScanFace, Ticket, Trophy, Users } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import money from '../../public/animations/money.json';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"


const TrabajaConNosotros = () => {
    const { usuario } = useContext(UserContext);
    const [dialog, setDialog] = useState(false)

    return (
        <>
            <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Contactanos</DialogTitle>
                    </DialogHeader>
                    <p>Si necesitas ayuda tenemos habilitado una línea de contacto a través de nuestro correo eléctronico <b>contacto@rifavo.com</b><br></br><br></br>Contáctanos e indicanos en qué podemos ayudarte</p>
                </DialogContent>
            </Dialog>
            <div className="w-full gap-2 mt-24 flex-col">
                <div className="md:flex-row flex-col bg-gradient-to-r from-white dark:from-black to-orange-200 w-full h-1/2 flex items-center justify-center overflow-hidden shadow-lg">
                    <div className="flex flex-col md:w-1/3 w-full my-14 md:mx-0 px-10">
                        <p className="text-black dark:text-white text-4xl font-bold">Trabaja con nosotros</p>
                        <p className="text-slate-600 dark:text-slate-400 mt-6">Trabajamos para generar oportunidades que cierren las brechas sociales y construyan un mejor país. Únete a nuestro propósito y descubre cómo tu talento puede hacer la diferencia.</p>
                        <Button onClick={() => setDialog(true)} className="w-40 mt-4">Contactanos</Button>
                    </div>
                    <img src="https://cms.colsubsidio.com/sites/default/files/2024-10/shutterstock_2509555365_0.png" alt="Hiring" className="sm:w-1/2 md:w-1/3 w-full" />
                </div>
                <div className="flex md:flex-row flex-col justify-center items-center gap-8 py-32">
                    <div className="flex flex-col gap-8 md:w-1/2 w-full md:px-0 sm:px-20 px-10">
                        <h1 className="font-bold text-4xl">Beneficios</h1>
                        <div className="flex items-start gap-4">
                            <CheckCircle2 color="#31bda6" className="mt-1" size={22} />
                            <div>
                                <p className="text-xl font-bold">Comision 10% por venta</p>
                                <p className="text-slate-600 dark:text-slate-400 w-2/3 mt-2">Gana un 10% de comisión por cada venta que realices. Cuanto más vendas, más ganas. ¡Aprovecha esta oportunidad para generar ingresos extra de manera fácil y rápida!</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <CheckCircle2 color="#31bda6" className="mt-1" size={22} />
                            <div>
                                <p className="text-xl font-bold">Soporte inmediato</p>
                                <p className="text-slate-600 dark:text-slate-400 w-2/3 mt-2">Nuestro equipo de soporte está disponible para ayudarte en todo momento, garantizando respuestas rápidas y efectivas para que sigas trabajando sin problemas.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <CheckCircle2 color="#31bda6" className="mt-1" size={22} />
                            <div>
                                <p className="text-xl font-bold">Material publicitario</p>
                                <p className="text-slate-600 dark:text-slate-400 w-2/3 mt-2">Te proporcionamos todo el material publicitario necesario, desde imágenes hasta textos listos para compartir, para que puedas promocionar las rifas de forma efectiva.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <CheckCircle2 color="#31bda6" className="mt-1" size={22} />
                            <div>
                                <p className="text-xl font-bold">Pagos rápidos</p>
                                <p className="text-slate-600 dark:text-slate-400 w-2/3 mt-2">Recibe tus pagos de forma ágil y segura. En RIFAVO, te garantizamos pagos rápidos y puntuales, para que tu esfuerzo sea recompensado sin demoras.</p>
                            </div>
                        </div>
                    </div>
                    <Lottie animationData={money} className="w-1/3" loop={true} />
                </div>
            </div>
        </>
    );
};

export default TrabajaConNosotros;
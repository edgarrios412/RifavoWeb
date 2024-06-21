import { Copyright, Dot, Facebook, Instagram, Twitter } from "lucide-react"
import Rifavo from "../icons/branding/Rifavo"
import { DialogHeader, DialogTitle, DialogContent, Dialog, DialogClose, DialogFooter } from "../ui/dialog"
import { useState } from "react"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion"
import RifavoLight from "../icons/branding/RifavoLight"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"

const Footer = () => {

    const [dialog, setDialog] = useState(false)
    // const [somos, setSomos] = useState(false)
    // const [premios, setPremios] = useState(false)
    const [politicas, setPoliticas] = useState(false)

    return (
        <>
            {/* <Dialog open={somos} onOpenChange={setSomos}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>¿Quienes somos?</DialogTitle>
                    </DialogHeader>
                    <p className="text-muted-foreground">Apartado en construcción estará disponible en breve</p>
                </DialogContent>
            </Dialog> */}
            {/* <Dialog open={premios} onOpenChange={setPremios}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reclamar premios</DialogTitle>
                    </DialogHeader>
                    <p className="text-muted-foreground">Apartado en construcción estará disponible en breve</p>
                </DialogContent>
            </Dialog> */}
            <Dialog open={politicas} onOpenChange={setPoliticas}>
                <DialogContent className="max-h-full overflow-y-scroll">
                    <DialogHeader>
                        <DialogTitle>Políticas de Uso de RIFAVO</DialogTitle>
                    </DialogHeader>
                    <b>1. Introducción</b>
                    Bienvenido a RIFAVO, tu plataforma de sorteos y rifas en línea. Estas políticas de uso están diseñadas para garantizar una experiencia justa, segura y transparente para todos nuestros usuarios. Al utilizar nuestra plataforma, aceptas cumplir con estas políticas y cualquier actualización futura que realicemos.
                    <b>2. Elegibilidad</b>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />Los usuarios deben tener al menos 18 años de edad para participar en los sorteos y rifas.</p>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />Los usuarios deben proporcionar información veraz y actualizada durante el proceso de registro.</p>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />Los empleados de RIFAVO y sus familiares directos no son elegibles para participar en los sorteos y rifas organizados por la plataforma.</p>
                    <b>3. Proceso de Participación</b>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />Los sorteos y rifas organizados en RIFAVO pueden ser gratuitos o de pago.</p>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />Cada sorteo o rifa tiene sus propias reglas y condiciones, que se detallan en la página específica del evento.</p>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />Los usuarios deben seguir todas las instrucciones proporcionadas para participar correctamente en cada sorteo o rifa.</p>
                    <b>4. Premios</b>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />Los premios se entregarán tal como se describen en la página del sorteo o rifa.</p>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />RIFAVO no es responsable de la calidad o funcionalidad de los premios proporcionados por terceros.</p>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />Los ganadores serán notificados a través de los medios de contacto proporcionados durante el registro.</p>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />Los premios no reclamados dentro del plazo especificado serán considerados perdidos y podrán ser reasignados a otro participante o utilizados en futuros sorteos.</p>
                    <b>5. Política de Reembolso</b>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />Las rifas y sorteos de pago no son reembolsables, a menos que se cancele el evento por parte de RIFAVO.</p>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />En caso de cancelación, los usuarios recibirán un reembolso completo de su participación.</p>
                    <b>6. Conducta del Usuario</b>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />Los usuarios deben comportarse de manera respetuosa y no deben realizar actividades fraudulentas, engañosas o perjudiciales.</p>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />El uso de bots, scripts u otros métodos automatizados para participar en los sorteos y rifas está estrictamente prohibido.</p>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />Cualquier comportamiento inapropiado resultará en la suspensión o eliminación de la cuenta del usuario.</p>
                    <b>7. Privacidad</b>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />RIFAVO se compromete a proteger la privacidad de sus usuarios. La información personal proporcionada durante el registro y la participación en sorteos será utilizada únicamente para los fines específicos de la plataforma.</p>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />Para más detalles, consulta nuestra Política de Privacidad.</p>
                    <b>8. Modificaciones y Actualizaciones</b>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />RIFAVO se reserva el derecho de modificar estas políticas en cualquier momento. Las modificaciones serán efectivas a partir de su publicación en nuestra plataforma.</p>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />Se recomienda a los usuarios revisar periódicamente estas políticas para estar al tanto de cualquier cambio.</p>
                    <b>9. Contacto</b>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />Para cualquier pregunta o inquietud sobre estas políticas, puedes contactarnos a través de nuestro soporte al cliente en atencionalcliente@gmail.com o visitar la sección de ayuda en nuestra plataforma.</p>
                    <b>10. Ley Aplicable</b>
                    <p className="flex gap-2"><Dot className="min-w-6 min-h-6" />Estas políticas están sujetas a las leyes vigentes en Colombia. Cualquier disputa relacionada con el uso de nuestra plataforma será resuelta bajo la jurisdicción de los tribunales competentes en Colombia.</p>
                    <Separator />
                    Al utilizar RIFAVO, aceptas estas políticas de uso. Gracias por ser parte de nuestra comunidad de sorteos y rifas. ¡Buena suerte en tu próxima participación!
                    <Separator />
                    <DialogFooter>
                        <Button onClick={() => setPoliticas(false)}>Cerrar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Solicitar soporte</DialogTitle>
                    </DialogHeader>
                    <p>Si necesitas ayuda tenemos habilitado una línea de atención al usuario a través de nuestro correo eléctronico <b>atencionalcliente@rifavo.com</b><br></br><br></br>Contáctanos e indicanos en qué podemos ayudarte</p>
                </DialogContent>
            </Dialog>
            <footer>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-20 justify-center px-20 py-10 mx-auto">
                    <a href="/" className="relative">
                        <div className="absolute visible dark:invisible h-full w-32 sm:w-40 flex items-center">
                            <Rifavo />
                        </div>
                        <div className="absolute invisible dark:visible h-full w-32 sm:w-40 flex items-center">
                            <RifavoLight />
                        </div>
                    </a>
                    <div className="">
                        <p className="font-bold">Redes sociales</p>
                        <div className="flex gap-5 mt-3">
                            <a href="https://web.facebook.com/profile.php?id=61560852461961" target="_blank">
                                <Facebook />
                            </a>
                            <a href="https://www.instagram.com/sorteos_rifavo/" target="_blank">
                                <Instagram />
                            </a>
                            {/* <a target="_blank">
                            <Twitter />
                        </a> */}
                        </div>
                        <p className="text-slate-500 text-sm mt-4 w-56">Subimos noticias y cosas importantes de la plataforma en nuestras redes sociales</p>
                    </div>
                    <div>
                        <p className="font-bold">Información</p>
                        <div className="flex flex-col gap-4 mt-3">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <a target="_blank">
                                        <p className="hover:underline cursor-pointer text-slate-700 dark:text-slate-400">Preguntas frecuentes</p>
                                    </a>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Preguntas frecuentes</SheetTitle>
                                        <SheetDescription>
                                            Antes de contactarnos asegurate de que tu pregunta no se encuentre en éste apartado
                                        </SheetDescription>
                                        <Accordion type="multiple" collapsible className="w-full">
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger className="font-bold hover:no-underline">¿Como puedo participar?</AccordionTrigger>
                                                <AccordionContent>
                                                    Para participar debes ingresar al sorteo que más te guste, seleccionar los numeros que desees comprar
                                                    luego rellena tus datos o inicia sesión en tu cuenta, coloca el método de pago y realiza el pago
                                                    y listo, ya estarás participando en el sorteo.
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-2">
                                                <AccordionTrigger className="font-bold hover:no-underline">¿Como puedo reclamar mi premio?</AccordionTrigger>
                                                <AccordionContent>
                                                    Si ganas un sorteo te llegará un correo electrónico avisandote que has ganado, el correo puede demorar hasta 24 horas en llegarte, pero llegará,
                                                    una vez recibas el correo el siguiente dia hábil el equipo de Rifavo se pondrá en contacto contigo para entregarte el premio.
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-3">
                                                <AccordionTrigger className="font-bold hover:no-underline">Como sé que recibiré mi premio si gano</AccordionTrigger>
                                                <AccordionContent>
                                                    Puedes tener confianza en nosotros, en nuestras redes sociales anunciamos siempre los ganadores y se puede corroborar que son personas reales.
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-4">
                                                <AccordionTrigger className="font-bold hover:no-underline">¿Cuales son los metodos de pago?</AccordionTrigger>
                                                <AccordionContent>
                                                    En estos momentos sólo estamos trabajando con WOMPI, que es un servicio de Bancolombia para pagos electrónicos, se puede pagar con Nequi, PSE hasta tarjetas de créditos o débitos,
                                                    proximamente estaremos agregando más metodos de pagos!
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-5">
                                                <AccordionTrigger className="font-bold hover:no-underline">¿Cuando iniciará el sorteo?</AccordionTrigger>
                                                <AccordionContent>
                                                    Los sorteos se inician una vez se vende el 65% de los tickets disponibles, una vez vendidos se asignará la fecha del sorteo, por lo general siempre
                                                    es el primer sábado transcurridas 6 semanas.
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </SheetHeader>
                                    <div className="grid gap-4 py-4">

                                    </div>
                                </SheetContent>
                            </Sheet>
                            {/* <a target="_blank">
                                <p onClick={() => setPremios(true)} className="hover:underline cursor-pointer text-slate-700">Reclamar premios</p>
                            </a> */}
                            <a target="_blank">
                                <p onClick={() => setPoliticas(true)} className="hover:underline cursor-pointer text-slate-700 dark:text-slate-400">Politicas</p>
                            </a>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold">Soporte</p>
                        <div className="flex flex-col gap-4 mt-3">
                            <a target="_blank">
                                <p onClick={() => setDialog(true)} className="hover:underline text-slate-700 dark:text-slate-400 cursor-pointer">Contactanos</p>
                            </a>
                            <a target="_blank">
                                <p onClick={() => setDialog(true)} className="hover:underline text-slate-700 dark:text-slate-400 cursor-pointer">Necesito ayuda</p>
                            </a>
                            <a target="_blank">
                                <p onClick={() => setDialog(true)} className="hover:underline text-slate-700 dark:text-slate-400 cursor-pointer">Reportar error</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="px-20 mb-10">
                    <p className="text-slate-500 text-sm flex gap-1 items-center"><Copyright className="w-4 h-4" /> Todos los derechos reservados por RIFAVO</p>
                </div>
            </footer>
        </>)
}

export default Footer
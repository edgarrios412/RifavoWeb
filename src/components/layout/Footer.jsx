import { Copyright, Facebook, Instagram, Twitter } from "lucide-react"
import Rifavo from "../icons/branding/Rifavo"
import { DialogHeader, DialogTitle, DialogContent, Dialog } from "../ui/dialog"
import { useState } from "react"

const Footer = () => {

    const [dialog, setDialog] = useState(false)
    const [somos, setSomos] = useState(false)
    const [premios, setPremios] = useState(false)
    const [politicas, setPoliticas] = useState(false)

    return (
        <>
            <Dialog open={somos} onOpenChange={setSomos}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>¿Quienes somos?</DialogTitle>
                    </DialogHeader>
                    <p className="text-muted-foreground">Apartado en construcción estará disponible en breve</p>
                </DialogContent>
            </Dialog>
            <Dialog open={premios} onOpenChange={setPremios}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reclamar premios</DialogTitle>
                    </DialogHeader>
                    <p className="text-muted-foreground">Apartado en construcción estará disponible en breve</p>
                </DialogContent>
            </Dialog>
            <Dialog open={politicas} onOpenChange={setPoliticas}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Politicas</DialogTitle>
                    </DialogHeader>
                    <p className="text-muted-foreground">Apartado en construcción estará disponible en breve</p>
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
                    <a href="/">
                        <div className="h-full w-32 sm:w-40 flex items-center">
                            <Rifavo />
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
                        <p className="text-slate-500 text-sm mt-4 w-56">Subimos noticias y cosas importantes en la paltaforma en nuestras redes sociales</p>
                    </div>
                    <div>
                        <p className="font-bold">Información</p>
                        <div className="flex flex-col gap-4 mt-3">
                            <a target="_blank">
                                <p onClick={() => setSomos(true)} className="hover:underline cursor-pointer text-slate-700">¿Quienes somos?</p>
                            </a>
                            <a target="_blank">
                                <p onClick={() => setPremios(true)} className="hover:underline cursor-pointer text-slate-700">Reclamar premios</p>
                            </a>
                            <a target="_blank">
                                <p onClick={() => setPoliticas(true)} className="hover:underline cursor-pointer text-slate-700">Politicas</p>
                            </a>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold">Soporte</p>
                        <div className="flex flex-col gap-4 mt-3">
                            <a target="_blank">
                                <p onClick={() => setDialog(true)} className="hover:underline text-slate-700 cursor-pointer">Contactanos</p>
                            </a>
                            <a target="_blank">
                                <p onClick={() => setDialog(true)} className="hover:underline text-slate-700 cursor-pointer">Necesito ayuda</p>
                            </a>
                            <a target="_blank">
                                <p onClick={() => setDialog(true)} className="hover:underline text-slate-700 cursor-pointer">Reportar error</p>
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
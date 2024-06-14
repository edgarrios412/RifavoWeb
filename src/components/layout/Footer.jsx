import { Copyright, Facebook, Instagram, Twitter } from "lucide-react"
import Rifavo from "../icons/branding/Rifavo"

const Footer = () => {
    return (
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
                        <a href="https://www.google.com" target="_blank">
                            <Facebook />
                        </a>
                        <a href="https://www.google.com" target="_blank">
                            <Instagram />
                        </a>
                        <a href="https://www.google.com" target="_blank">
                            <Twitter />
                        </a>
                    </div>
                    <p className="text-slate-500 text-sm mt-4 w-56">Subimos noticias y cosas importantes en la paltaforma en nuestras redes sociales</p>
                </div>
                <div>
                    <p className="font-bold">Información</p>
                    <div className="flex flex-col gap-4 mt-3">
                        <a href="https://www.google.com" target="_blank">
                            <p className="text-slate-700">¿Quienes somos?</p>
                        </a>
                        <a href="https://www.google.com" target="_blank">
                            <p className="text-slate-700">Reclamar premios</p>
                        </a>
                        <a href="https://www.google.com" target="_blank">
                            <p className="text-slate-700">Politicas</p>
                        </a>
                    </div>
                </div>
                <div>
                    <p className="font-bold">Soporte</p>
                    <div className="flex flex-col gap-4 mt-3">
                        <a href="https://www.google.com" target="_blank">
                            <p className="text-slate-700">Contactanos</p>
                        </a>
                        <a href="https://www.google.com" target="_blank">
                            <p className="text-slate-700">Necesito ayuda</p>
                        </a>
                        <a href="https://www.google.com" target="_blank">
                            <p className="text-slate-700">Reportar error</p>
                        </a>
                    </div>
                </div>
            </div>
            <div className="px-20 mb-10">
                <p className="text-slate-500 text-sm flex gap-1 items-center"><Copyright className="w-4 h-4" /> Todos los derechos reservados por RIFAVO</p>
            </div>
        </footer>
    )
}

export default Footer
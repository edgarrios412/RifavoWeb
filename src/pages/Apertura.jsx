import useCountdown from "use-simple-countdown"
import { useEffect, useState } from "react"
import Rifavo from "@/components/icons/branding/Rifavo"
import { Facebook, Instagram } from "lucide-react"
import RifavoLight from "@/components/icons/branding/RifavoLight"

const Apertura = () => {
    const [s, m, h, d] = useCountdown(new Date(2024, 6, 1))

    return (
        <div className="flex items-center justify-center sm:h-[100vh] overflow-x-hidden relative">
            <div class="orange-blur"></div>
            <div class="orange-blur2 invisible lg:visible"></div>
            {/* <div class="orange-blur3"></div> */}
            <div className="flex flex-col justify-center px-8 sm:px-0 py-4 w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[40%]">
                <div className="relative">
                <div className="absolute visible dark:invisible w-72 sm:w-96 my-10">
                    <Rifavo />
                </div>
                <div className="invisible dark:visible w-72 sm:w-96 my-10">
                    <RifavoLight />
                </div>
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold">Llegaremos muy pronto</h1>
                <p className="mt-4 text text-slate-500 text-normal sm:text-lg">Queremos que tengas una buena experiencia usando nuestra plataforma así que estamos haciendo lo mejor para tener una plataforma que puedas usar facilmente</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-10 justify-items-center">
                    <div className="w-32 h-32 border border-slate-300 rounded-full flex flex-col items-center justify-center">
                        <p className="text-3xl">{d}</p>
                        <p className="text-muted-foreground">dias</p>
                    </div>
                    <div className="w-32 h-32 border border-slate-300 rounded-full flex flex-col items-center justify-center">
                        <p className="text-3xl">{h}</p>
                        <p className="text-muted-foreground">horas</p>
                    </div>
                    <div className="w-32 h-32 border border-slate-300 rounded-full flex flex-col items-center justify-center">
                        <p className="text-3xl">{m}</p>
                        <p className="text-muted-foreground">minutos</p>
                    </div>
                    <div className="w-32 h-32 border border-slate-300 rounded-full flex flex-col items-center justify-center">
                        <p className="text-3xl">{s}</p>
                        <p className="text-muted-foreground">segundos</p>
                    </div>
                </div>
                <div className="flex justify-between gap-5 mt-3">
                    <p className="text-slate-500 text-sm sm:text-base">Mantente al tanto a través de nuestras redes sociales</p>
                    <div className="flex gap-5">
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
                </div>
            </div>
        </div>
    )
}

export default Apertura
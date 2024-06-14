import { useState } from "react";
import { UserContext } from "./UserContext"
// import { useUsuarios } from "../hooks/useUsuarios";
import axios from "axios"

export const UserProvider = ({children}) => {

    const [usuario, setUsuario] = useState(null)
    
    const updateUsuario = () => {
        const token = localStorage.getItem("token")
        if(!token) return setUsuario(null)
        axios.get("/user/token/"+token)
        .then(({data}) => setUsuario(data))
    }

    return (
        <UserContext.Provider value={{usuario, setUsuario, updateUsuario}}>
            {children}
        </UserContext.Provider>
    )
}
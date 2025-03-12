export const obfuscateName = (name) => {
    if(name){
        const obfuscatedName = name.slice(0, 3) + '*'.repeat(name.length - 3);
        return obfuscatedName;
    }
    else{
        return "No existe nombre";
    }
}

export const obfuscateEmail = (email) => {
    // Dividir el nombre completo en nombre y apellido
    if(email){
        const [user, correo] = email.split('@');
      
        // Crear el nombre ofuscado
        const obfuscatedEmail = user?.slice(0, 3) + '*'.repeat(user?.length - 3);
      
        // Juntar el nombre y el apellido ofuscados
        return `${obfuscatedEmail}@${correo}`;
    }else{
        return "Nadie adquirió el número, el premio es de la casa";
    }
}
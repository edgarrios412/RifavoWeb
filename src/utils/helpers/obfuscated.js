export const obfuscateName = (name) => {
    const obfuscatedName = name.slice(0, 3) + '*'.repeat(name.length - 3);
    return obfuscatedName;
}

export const obfuscateEmail = (email) => {
    // Dividir el nombre completo en nombre y apellido
    const [user, correo] = email.split('@');
  
    // Crear el nombre ofuscado
    const obfuscatedEmail = user.slice(0, 3) + '*'.repeat(user.length - 3);
  
    // Juntar el nombre y el apellido ofuscados
    return `${obfuscatedEmail}@${correo}`;
}
export function formatDate(dateString) {
    // Crear un objeto Date a partir de la cadena de fecha y hora
    const date = new Date(dateString);
   
    // Extraer el día, mes, año, hora y minutos
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript empiezan en 0
    const year = date.getFullYear().toString().substr(-2); // Tomar solo los últimos dos dígitos del año
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
   
    // Construir la nueva cadena de fecha y hora en el formato deseado
    const newDateString = `${day}/${month}/${year} ${hours}:${minutes}`;
   
    return newDateString;
}


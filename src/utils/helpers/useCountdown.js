import { useEffect, useState } from "react";

const timeLeft = (fechaFinal) => {
  const ahora = new Date();
  const tiempoRestante = fechaFinal.getTime() - ahora.getTime();

  const s = String(Math.floor((tiempoRestante / 1000) % 60)).padStart(2,"0");
  const m = String(Math.floor((tiempoRestante / 1000 / 60) % 60)).padStart(2,"0");
  const h = String(Math.floor((tiempoRestante / (1000 * 60 * 60)) % 24)).padStart(2,"0");
  const d = String(Math.floor(tiempoRestante / (1000 * 60 * 60 * 24))).padStart(2,"0")

  return [s, m, h, d];
};

const useCountdown = (fechaFinal) => {
  const [time, setTime] = useState(timeLeft(fechaFinal));

  useEffect(() => {
    setInterval(() => setTime(timeLeft(fechaFinal)), 1000);
  }, []);

  return time;
};

export default useCountdown;

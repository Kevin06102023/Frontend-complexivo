import React, { useState } from "react";
import axios from "axios";

function Asistencia() {
  const [qr, setQr] = useState("");
  const [mensaje, setMensaje] = useState("");

  const registrar = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/asistencias", {
        qrCode: qr
      });

      setMensaje(res.data);
    } catch (error) {
      console.error(error);
      setMensaje("Error en asistencia");
    }
  };

  return (
    <div>
      <h2>Asistencia QR</h2>

      <input
        placeholder="Escanear QR o ingresar código"
        onChange={(e) => setQr(e.target.value)}
      />

      <button onClick={registrar}>Registrar</button>

      <p>{mensaje}</p>
    </div>
  );
}

export default Asistencia;
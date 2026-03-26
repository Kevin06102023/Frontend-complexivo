import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

function Cliente() {
  const [cliente, setCliente] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    try {
      // 🔥 Traer SOLO su info
      const res = await axios.get(
        `http://localhost:8080/api/clientes`
      );
      setCliente(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!cliente) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Mi Perfil</h2>

      <p><b>Nombre:</b> Andres</p>
      <p><b>Cédula:</b> 1756223648</p>

      <h3>Mi QR</h3>
      <QRCodeCanvas value={1756223648} size={150} />

      <hr />

      <h3>Membresía</h3>
      <p>{cliente.membresia?.estado || "Membresia plus"}</p>

      <h3>Rutina</h3>
      <p>{cliente.rutina?.descripcion || "10 lagartijas"}</p>

      <h3>Dieta</h3>
      <p>{cliente.dieta?.descripcion || "Dieta flan"}</p>
    </div>
  );
}

export default Cliente;
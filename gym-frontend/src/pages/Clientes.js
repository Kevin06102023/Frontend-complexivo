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
      const res = await axios.get(`http://localhost:8080/api/clientes`);
      setCliente(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!cliente) return <p>Cargando...</p>;

  return (
    <div style={{
      maxWidth: "600px",
      margin: "50px auto",
      padding: "20px",
      backgroundColor: "#fdfdfd",
      borderRadius: "10px",
      fontFamily: "Arial, sans-serif",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Mi Perfil</h2>

      {/* Botón de regresar al Dashboard */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => window.location.href = "/admin"}
          style={{
            padding: "8px 15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#6f42c1",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          ← Regresar al Dashboard
        </button>
      </div>

      <div style={{
        padding: "15px",
        borderRadius: "8px",
        backgroundColor: "#e3f2fd",
        marginBottom: "20px"
      }}>
        <p><b>Nombre:</b> Andres</p>
        <p><b>Cédula:</b> 1756223648</p>
      </div>

      <div style={{
        textAlign: "center",
        padding: "15px",
        borderRadius: "8px",
        backgroundColor: "#fff3cd",
        marginBottom: "20px"
      }}>
        <h3>Mi QR</h3>
        <QRCodeCanvas value={1756223648} size={150} />
      </div>

      <hr style={{ margin: "20px 0", borderColor: "#ddd" }} />

      <div style={{
        padding: "15px",
        borderRadius: "8px",
        backgroundColor: "#d1ecf1",
        marginBottom: "15px"
      }}>
        <h3>Membresía</h3>
        <p>{cliente.membresia?.estado || "Membresia plus"}</p>
      </div>

      <div style={{
        padding: "15px",
        borderRadius: "8px",
        backgroundColor: "#fff3cd",
        marginBottom: "15px"
      }}>
        <h3>Rutina</h3>
        <p>{cliente.rutina?.descripcion || "10 lagartijas"}</p>
      </div>

      <div style={{
        padding: "15px",
        borderRadius: "8px",
        backgroundColor: "#f8d7da",
        marginBottom: "15px"
      }}>
        <h3>Dieta</h3>
        <p>{cliente.dieta?.descripcion || "Dieta flan"}</p>
      </div>
    </div>
  );
}

export default Cliente;
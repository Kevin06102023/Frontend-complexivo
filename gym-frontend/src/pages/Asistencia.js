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
    <div style={{
      maxWidth: "500px",
      margin: "50px auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      fontFamily: "Arial, sans-serif",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      textAlign: "center"
    }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Asistencia QR</h2>

      {/* Botón de regresar */}
      <button
        onClick={() => window.location.href = "/admin"}
        style={{
          padding: "8px 15px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#6f42c1",
          color: "#fff",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        ← Regresar al Dashboard
      </button>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Escanear QR o ingresar código"
          onChange={(e) => setQr(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px"
          }}
        />
        <br />
        <button
          onClick={registrar}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Registrar
        </button>
      </div>

      {mensaje && (
        <p style={{ marginTop: "10px", color: "#333", fontWeight: "bold" }}>{mensaje}</p>
      )}
    </div>
  );
}

export default Asistencia;
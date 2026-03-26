import React, { useEffect, useState } from "react";
import axios from "axios";

function Entrenador() {
  const [clientes, setClientes] = useState([]);
  const [descripcionRutina, setDescripcionRutina] = useState("");
  const [descripcionDieta, setDescripcionDieta] = useState("");
  const [clienteId, setClienteId] = useState("");

  // Obtener clientes
  const getClientes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/clientes");
      setClientes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  // Crear rutina
  const crearRutina = async () => {
    if (!clienteId) return alert("Selecciona un cliente primero");
    if (!descripcionRutina.trim()) return alert("Ingresa descripción de la rutina");

    try {
      await axios.post("http://localhost:8080/api/rutinas", {
        clienteId, // Revisa tu backend: tal vez deba ser clienteId directo
        descripcion: descripcionRutina
      });
      alert("Rutina creada");
      setDescripcionRutina("");
    } catch (error) {
      console.error(error);
      alert("Error al crear rutina: " + (error.response?.data || error.message));
    }
  };

  // Crear dieta
  const crearDieta = async () => {
    if (!clienteId) return alert("Selecciona un cliente primero");
    if (!descripcionDieta.trim()) return alert("Ingresa descripción de la dieta");

    try {
      await axios.post("http://localhost:8080/api/dietas", {
        clienteId,
        descripcion: descripcionDieta
      });
      alert("Dieta creada");
      setDescripcionDieta("");
    } catch (error) {
      console.error(error);
      alert("Error al crear dieta: " + (error.response?.data || error.message));
    }
  };

  return (
    <div style={{
      maxWidth: "700px",
      margin: "50px auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      fontFamily: "Arial, sans-serif",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Panel Entrenador</h2>

      {/* Clientes */}
      <div style={{ marginBottom: "30px" }}>
        <h3 style={{ color: "#555" }}>Clientes</h3>
        {clientes.map((c) => (
          <div
            key={c.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: clienteId === c.id ? "#d1ecf1" : "#fff",
              marginBottom: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
          >
            <p style={{ margin: 0 }}>{c.nombre} - {c.cedula}</p>
            <button
              onClick={() => setClienteId(clienteId === c.id ? "" : c.id)}
              style={{
                padding: "5px 12px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: clienteId === c.id ? "#007BFF" : "#17a2b8",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              {clienteId === c.id ? "Seleccionado" : "Seleccionar"}
            </button>
          </div>
        ))}
      </div>

      <hr style={{ margin: "20px 0", borderColor: "#ddd" }} />

      {/* Crear Rutina */}
      <div style={{
        marginBottom: "20px",
        padding: "15px",
        borderRadius: "8px",
        backgroundColor: "#fff3cd"
      }}>
        <h3 style={{ marginTop: 0 }}>Crear Rutina</h3>
        <input
          placeholder="Descripción rutina"
          value={descripcionRutina}
          onChange={(e) => setDescripcionRutina(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px"
          }}
        />
        <button
          onClick={crearRutina}
          style={{
            padding: "8px 15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#28a745",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Guardar Rutina
        </button>
      </div>

      <hr style={{ margin: "20px 0", borderColor: "#ddd" }} />

      {/* Crear Dieta */}
      <div style={{
        marginBottom: "20px",
        padding: "15px",
        borderRadius: "8px",
        backgroundColor: "#f8d7da"
      }}>
        <h3 style={{ marginTop: 0 }}>Crear Dieta</h3>
        <input
          placeholder="Descripción dieta"
          value={descripcionDieta}
          onChange={(e) => setDescripcionDieta(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px"
          }}
        />
        <button
          onClick={crearDieta}
          style={{
            padding: "8px 15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Guardar Dieta
        </button>
      </div>

      {/* Botones de acción */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => window.location.href = "/dashboard"}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#6c757d",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Regresar al Dashboard
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#dc3545",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Entrenador;
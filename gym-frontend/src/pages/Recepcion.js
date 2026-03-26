import React, { useEffect, useState } from "react";
import axios from "axios";

function Recepcion() {
  const [clientes, setClientes] = useState([]);
  const [membresias, setMembresias] = useState([]);
  const [membresia, setMembresia] = useState({
    id: null, // Para saber si estamos editando
    tipo: "",
    clienteId: "",
    fecha_inicio: "",
    fecha_fin: ""
  });

  // Obtener clientes
  useEffect(() => {
    axios.get("http://localhost:8080/api/clientes")
      .then(res => setClientes(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error("Error al cargar clientes:", err));
  }, []);

  // Obtener membresías
  const getMembresias = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/membresias");
      setMembresias(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error al cargar membresías:", err);
    }
  };

  useEffect(() => {
    getMembresias();
  }, []);

  // Crear o editar membresía
  const guardarMembresia = async () => {
    if (!membresia.clienteId || !membresia.tipo || !membresia.fecha_inicio || !membresia.fecha_fin) {
      alert("Por favor completa todos los campos");
      return;
    }

    const payload = {
      estado: membresia.tipo,
      fecha_inicio: membresia.fecha_inicio,
      fecha_fin: membresia.fecha_fin,
      cliente: { id: membresia.clienteId }
    };

    try {
      if (membresia.id) {
        // Editar
        await axios.put(`http://localhost:8080/api/membresias/${membresia.id}`, payload);
        alert("Membresía actualizada");
      } else {
        // Crear
        await axios.post("http://localhost:8080/api/membresias", payload);
        alert("Membresía asignada");
      }

      // Reset del formulario
      setMembresia({ id: null, tipo: "", clienteId: "", fecha_inicio: "", fecha_fin: "" });
      getMembresias();
    } catch (err) {
      console.error("Error al guardar membresía:", err);
      alert("Error al guardar membresía");
    }
  };

  // Editar membresía (cargar datos en el formulario)
  const editarMembresia = (m) => {
    setMembresia({
      id: m.id,
      tipo: m.estado,
      clienteId: m.cliente?.id || "",
      fecha_inicio: m.fecha_inicio,
      fecha_fin: m.fecha_fin
    });
  };

  // Eliminar membresía
  const eliminarMembresia = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta membresía?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/membresias/${id}`);
      alert("Membresía eliminada");
      getMembresias();
    } catch (err) {
      console.error("Error al eliminar membresía:", err);
      alert("Error al eliminar membresía");
    }
  };

  // Cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div style={{ maxWidth: "700px", margin: "50px auto", padding: "25px", backgroundColor: "#fdfdfd", borderRadius: "10px", fontFamily: "Arial, sans-serif", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Recepción - Membresías</h2>

      {/* Formulario */}
      <div style={{ marginBottom: "30px" }}>
        <select
          value={membresia.clienteId}
          onChange={e => setMembresia({ ...membresia, clienteId: e.target.value })}
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
        >
          <option value="">Seleccionar cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <input
          placeholder="Tipo de Membresía"
          value={membresia.tipo}
          onChange={e => setMembresia({ ...membresia, tipo: e.target.value })}
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
        />

        <label>Fecha de inicio:</label>
        <input
          type="date"
          value={membresia.fecha_inicio}
          onChange={e => setMembresia({ ...membresia, fecha_inicio: e.target.value })}
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
        />

        <label>Fecha de fin:</label>
        <input
          type="date"
          value={membresia.fecha_fin}
          onChange={e => setMembresia({ ...membresia, fecha_fin: e.target.value })}
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
        />

        <button
          onClick={guardarMembresia}
          style={{ width: "100%", padding: "12px", borderRadius: "5px", border: "none", backgroundColor: "#28a745", color: "#fff", cursor: "pointer", fontWeight: "bold", marginBottom: "10px" }}
        >
          {membresia.id ? "Guardar Cambios" : "Asignar Membresía"}
        </button>

        <button
          onClick={cerrarSesion}
          style={{ width: "100%", padding: "12px", borderRadius: "5px", border: "none", backgroundColor: "#dc3545", color: "#fff", cursor: "pointer", fontWeight: "bold" }}
        >
          Cerrar sesión
        </button>
      </div>

      {/* Listado de Membresías */}
      <h3>Membresías Activas</h3>
      {membresias.length === 0 ? (
        <p>No hay membresías registradas.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Cliente</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Tipo</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Inicio</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Fin</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {membresias.map(m => (
              <tr key={m.id}>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{m.cliente?.nombre || "Desconocido"}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{m.estado}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{m.fecha_inicio}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{m.fecha_fin}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  <button onClick={() => editarMembresia(m)} style={{ marginRight: "5px", padding: "5px 10px", borderRadius: "5px", border: "none", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}>Editar</button>
                  <button onClick={() => eliminarMembresia(m.id)} style={{ padding: "5px 10px", borderRadius: "5px", border: "none", backgroundColor: "#dc3545", color: "#fff", cursor: "pointer" }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Recepcion;
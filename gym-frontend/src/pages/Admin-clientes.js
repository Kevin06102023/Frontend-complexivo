import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminClientes() {
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({
    id: null,       // Para saber si estamos editando
    cedula: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: ""
  });

  // Cargar clientes
  const getClientes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/clientes");
      const data = Array.isArray(res.data) ? res.data : Array.isArray(res.data.data) ? res.data.data : [];
      setClientes(data);
    } catch (err) {
      console.error("Error al cargar clientes:", err);
      setClientes([]);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  // Crear o actualizar cliente
  const guardarCliente = async () => {
    if (!cliente.cedula || !cliente.nombre || !cliente.apellido || !cliente.email || !cliente.telefono) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      if (cliente.id) {
        await axios.put(`http://localhost:8080/api/clientes/${cliente.id}`, cliente);
        alert("Cliente actualizado");
      } else {
        await axios.post("http://localhost:8080/api/clientes", cliente);
        alert("Cliente creado");
      }

      setCliente({ id: null, cedula: "", nombre: "", apellido: "", email: "", telefono: "" });
      getClientes();
    } catch (err) {
      console.error("Error al guardar cliente:", err);
      alert("Error al guardar cliente");
    }
  };

  // Cargar cliente en formulario para editar
  const editarCliente = (c) => {
    setCliente({
      id: c.id,
      cedula: c.cedula || "",
      nombre: c.nombre || "",
      apellido: c.apellido || "",
      email: c.email || "",
      telefono: c.telefono || ""
    });
  };

  // Eliminar cliente
  const eliminarCliente = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/clientes/${id}`);
      alert("Cliente eliminado");
      getClientes();
    } catch (err) {
      console.error("Error al eliminar cliente:", err);
      alert("Error al eliminar cliente");
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "50px auto", padding: "25px", backgroundColor: "#fdfdfd", borderRadius: "10px", fontFamily: "Arial, sans-serif", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      
      {/* Botón para regresar al dashboard */}
      <button
        onClick={() => window.location.href = "/dashboard"}
        style={{ marginBottom: "20px", padding: "10px 15px", borderRadius: "5px", border: "none", backgroundColor: "#6c757d", color: "#fff", cursor: "pointer", fontWeight: "bold" }}
      >
        ← Volver al Dashboard
      </button>

      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Administrar Clientes</h2>

      {/* Formulario */}
      <div style={{ marginBottom: "30px" }}>
        <input
          placeholder="Cédula"
          value={cliente.cedula}
          onChange={e => setCliente({ ...cliente, cedula: e.target.value })}
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
        />
        <input
          placeholder="Nombre"
          value={cliente.nombre}
          onChange={e => setCliente({ ...cliente, nombre: e.target.value })}
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
        />
        <input
          placeholder="Apellido"
          value={cliente.apellido}
          onChange={e => setCliente({ ...cliente, apellido: e.target.value })}
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
        />
        <input
          placeholder="Email"
          value={cliente.email}
          onChange={e => setCliente({ ...cliente, email: e.target.value })}
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
        />
        <input
          placeholder="Teléfono"
          value={cliente.telefono}
          onChange={e => setCliente({ ...cliente, telefono: e.target.value })}
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
        />

        <button
          onClick={guardarCliente}
          style={{ width: "100%", padding: "12px", borderRadius: "5px", border: "none", backgroundColor: "#28a745", color: "#fff", cursor: "pointer", fontWeight: "bold", marginBottom: "10px" }}
        >
          {cliente.id ? "Guardar Cambios" : "Crear Cliente"}
        </button>
      </div>

      {/* Lista de clientes */}
      <h3>Clientes Registrados</h3>
      {Array.isArray(clientes) && clientes.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Cédula</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Nombre</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Apellido</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Email</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Teléfono</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(c => (
              <tr key={c.id}>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{c.cedula}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{c.nombre}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{c.apellido}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{c.email}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{c.telefono}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  <button onClick={() => editarCliente(c)} style={{ marginRight: "5px", padding: "5px 10px", borderRadius: "5px", border: "none", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}>Editar</button>
                  <button onClick={() => eliminarCliente(c.id)} style={{ padding: "5px 10px", borderRadius: "5px", border: "none", backgroundColor: "#dc3545", color: "#fff", cursor: "pointer" }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay clientes registrados.</p>
      )}
    </div>
  );
}

export default AdminClientes;
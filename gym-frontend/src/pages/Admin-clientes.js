import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminClientes() {
  const [clientes, setClientes] = useState([]);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cedula, setCedula] = useState(""); // 🔹 Nueva
  const [editingId, setEditingId] = useState(null);

  // 🔹 Obtener clientes
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

  // 🔹 Guardar cliente
  const guardarCliente = async () => {
    if (!cedula || cedula.trim() === "0") {
      alert("La cédula es obligatoria y no puede ser 0");
      return;
    }

    try {
      const data = {
        nombre,
        apellido,
        email,
        telefono,
        cedula // 🔹 enviamos cedula
      };

      if (editingId) {
        await axios.put(`http://localhost:8080/api/clientes/${editingId}`, data);
        alert("Cliente actualizado");
      } else {
        await axios.post("http://localhost:8080/api/clientes", data);
        alert("Cliente creado");
      }

      limpiarFormulario();
      getClientes();
    } catch (error) {
      console.error(error);
      alert("Error al guardar cliente");
    }
  };

  const editarCliente = (c) => {
    setNombre(c.nombre);
    setApellido(c.apellido);
    setEmail(c.email);
    setTelefono(c.telefono);
    setCedula(c.cedula); // 🔹 llenamos cedula al editar
    setEditingId(c.id);
  };

  const eliminarCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/clientes/${id}`);
      alert("Cliente eliminado");
      getClientes();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar cliente");
    }
  };

  const limpiarFormulario = () => {
    setNombre("");
    setApellido("");
    setEmail("");
    setTelefono("");
    setCedula(""); // 🔹 limpiamos cedula
    setEditingId(null);
  };

  return (
    <div>
      <h2>Admin - Clientes</h2>

      {/* 🔹 FORM */}
      <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      <input placeholder="Cédula" value={cedula} onChange={(e) => setCedula(e.target.value)} /> {/* 🔹 nuevo */}

      <button onClick={guardarCliente}>
        {editingId ? "Actualizar" : "Crear"}
      </button>

      {editingId && <button onClick={limpiarFormulario}>Cancelar</button>}

      <hr />

      {/* 🔹 LISTA */}
      {clientes.map((c) => (
        <div key={c.id} style={{ border: "1px solid black", margin: 10, padding: 5 }}>
          <p><strong>{c.nombre} {c.apellido}</strong></p>
          <p>Email: {c.email}</p>
          <p>Teléfono: {c.telefono}</p>
          <p>Cédula: {c.cedula}</p> {/* 🔹 mostramos cedula */}
          <p>QR: {c.qrCode}</p> {/* 🔹 mostramos qrCode generado */}

          <button onClick={() => editarCliente(c)}>Editar</button>
          <button onClick={() => eliminarCliente(c.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default AdminClientes;
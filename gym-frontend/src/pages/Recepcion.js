import React, { useEffect, useState } from "react";
import axios from "axios";

function Recepcion() {
  const [clientes, setClientes] = useState([]);
  const [membresia, setMembresia] = useState({ tipo: "", clienteId: "" });

  // Obtener clientes
  useEffect(() => {
    axios.get("http://localhost:8080/api/clientes")
      .then(res => setClientes(res.data))
      .catch(err => console.error(err));
  }, []);

  // Crear / Asignar membresía
  const crearMembresia = async () => {
    try {
      await axios.post("http://localhost:8080/api/membresias", membresia);
      alert("Membresía asignada");
    } catch (err) {
      console.error(err);
      alert("Error al asignar membresía");
    }
  };

  return (
    <div>
      <h2>Recepción - Membresías</h2>

      <select onChange={e => setMembresia({...membresia, clienteId: e.target.value})}>
        <option value="">Seleccionar cliente</option>
        {clientes.map(c => (
          <option key={c.id} value={c.id}>{c.nombre}</option>
        ))}
      </select>

      <input
        placeholder="Tipo de Membresía"
        onChange={e => setMembresia({...membresia, tipo: e.target.value})}
      />

      <button onClick={crearMembresia}>Asignar Membresía</button>

      <hr />

      {/* Aquí puedes listar las membresías activas si quieres */}
    </div>
  );
}

export default Recepcion;
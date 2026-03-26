import React, { useEffect, useState } from "react";
import axios from "axios";

function Entrenador() {
  const [clientes, setClientes] = useState([]);
  const [descripcionRutina, setDescripcionRutina] = useState("");
  const [descripcionDieta, setDescripcionDieta] = useState("");
  const [clienteId, setClienteId] = useState("");

  // 🔥 Obtener clientes
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

  // 🔥 Crear rutina
  const crearRutina = async () => {
    try {
      await axios.post("http://localhost:8080/api/rutinas", {
        cliente: { id: clienteId },
        descripcion: descripcionRutina
      });

      alert("Rutina creada");
    } catch (error) {
      console.error(error);
      alert("Error rutina");
    }
  };

  // 🔥 Crear dieta
  const crearDieta = async () => {
    try {
      await axios.post("http://localhost:8080/api/dietas", {
        cliente: { id: clienteId },
        descripcion: descripcionDieta
      });

      alert("Dieta creada");
    } catch (error) {
      console.error(error);
      alert("Error dieta");
    }
  };

  return (
    <div>
      <h2>Panel Entrenador</h2>

      <h3>Clientes</h3>
      {clientes.map((c) => (
        <div key={c.id}>
          <p>{c.nombre} - {c.cedula}</p>
          <button onClick={() => setClienteId(c.id)}>
            Seleccionar
          </button>
        </div>
      ))}

      <hr />

      <h3>Crear Rutina</h3>
      <input
        placeholder="Descripción rutina"
        onChange={(e) => setDescripcionRutina(e.target.value)}
      />
      <button onClick={crearRutina}>Guardar Rutina</button>

      <hr />

      <h3>Crear Dieta</h3>
      <input
        placeholder="Descripción dieta"
        onChange={(e) => setDescripcionDieta(e.target.value)}
      />
      <button onClick={crearDieta}>Guardar Dieta</button>
    </div>
  );
}

export default Entrenador;
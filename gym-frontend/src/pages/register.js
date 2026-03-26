import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // 🔥 NUEVO
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

 const handleRegister = async () => {
  console.log({ username, email, password, role }); // 🔥

  try {
    const response = await axios.post("http://localhost:8080/api/auth/register", {
      username,
      email,
      password,
      role
    });

    alert(response.data);
  } catch (error) {
    console.error(error);
    alert("Error al registrar");
  }
};

  return (
    <div>
      <h2>Registro</h2>

      <input
        type="text"
        placeholder="Usuario"
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />

      {/* 🔥 INPUT EMAIL */}
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="">Seleccionar rol</option>
        <option value="ADMIN">Administrador</option>
        <option value="RECEPCION">Recepción</option>
        <option value="ENTRENADOR">Entrenador</option>
        <option value="CLIENTE">Cliente</option>
      </select>

      <br /><br />

      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
}

export default Register;
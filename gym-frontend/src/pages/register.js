import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async () => {
    console.log({ username, email, password, role });

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
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "30px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      textAlign: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Registro</h2>

      <input
        type="text"
        placeholder="Usuario"
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      <br />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      <br />

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      <br />

      <select
        onChange={(e) => setRole(e.target.value)}
        style={{
          width: "84%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "20px"
        }}
      >
        <option value="">Seleccionar rol</option>
        <option value="ADMIN">Administrador</option>
        <option value="RECEPCION">Recepción</option>
        <option value="ENTRENADOR">Entrenador</option>
        <option value="CLIENTE">Cliente</option>
      </select>

      <br />

      <button
        onClick={handleRegister}
        style={{
          width: "85%",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#28a745",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Registrar
      </button>

      <p style={{ marginTop: "20px" }}>
        ¿Ya tienes cuenta?{" "}
        <a href="/" style={{ color: "#28a745", textDecoration: "none" }}>
          Inicia sesión
        </a>
      </p>
    </div>
  );
}

export default Register;
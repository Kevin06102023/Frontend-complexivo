import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password
      });

      const user = response.data;

      console.log(user);

      localStorage.setItem("user", JSON.stringify(user));

      alert("Login exitoso");

      // REDIRECCIÓN POR ROL
      if (user.role === "ADMIN") {
        window.location.href = "/admin";
      } else if (user.role === "RECEPCION") {
        window.location.href = "/recepcion";
      } else if (user.role === "ENTRENADOR") {
        window.location.href = "/entrenador";
      } else if (user.role === "CLIENTE") {
        window.location.href = "/cliente";
      } else {
        window.location.href = "/";
      }

    } catch (error) {
      console.error(error);
      alert("Usuario o contraseña incorrectos");
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
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Login</h2>

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
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      <br />

      <button
        onClick={handleLogin}
        style={{
          width: "85%",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#007BFF",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Ingresar
      </button>

      <p style={{ marginTop: "20px" }}>
        ¿No tienes cuenta?{" "}
        <a href="/register" style={{ color: "#007BFF", textDecoration: "none" }}>
          Regístrate aquí
        </a>
      </p>
    </div>
  );
}

export default Login;
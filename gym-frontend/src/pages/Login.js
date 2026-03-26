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
    <div>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Usuario"
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}

export default Login;
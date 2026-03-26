// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import Clientes from "./pages/Clientes";
import Asistencia from "./pages/Asistencia";
import Cliente from "./pages/Clientes"; // Cliente individual
import Entrenador from "./pages/Entrenador";
import Recepcion from "./pages/Recepcion";
import AdminClientes from "./pages/Admin-clientes";

// 🔹 PROTECCIÓN DE RUTAS
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/" />;
};

// 🔹 RUTA SEGÚN ROL
const RoleRoute = ({ children, roles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/" />;
  return roles.includes(user.role) ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 RUTAS PÚBLICAS */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 RUTAS PRIVADAS */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Clientes - solo ADMIN y ENTRENADOR */}
        <Route
          path="/clientes"
          element={
            <RoleRoute roles={["ADMIN", "ENTRENADOR"]}>
              <Clientes />
            </RoleRoute>
          }
        />

        {/* Cliente individual - solo CLIENTE */}
        <Route
          path="/cliente"
          element={
            <RoleRoute roles={["CLIENTE"]}>
              <Cliente />
            </RoleRoute>
          }
        />

        {/* Entrenador - solo ENTRENADOR */}
        <Route
          path="/entrenador"
          element={
            <RoleRoute roles={["ENTRENADOR"]}>
              <Entrenador />
            </RoleRoute>
          }
        />

        {/* Recepción - solo RECEPCION y ADMIN */}
        <Route
          path="/recepcion"
          element={
            <RoleRoute roles={["RECEPCION", "ADMIN"]}>
              <Recepcion />
            </RoleRoute>
          }
        />

        {/* CRUD Clientes ADMIN - solo ADMIN */}
        <Route
          path="/admin-clientes"
          element={
            <RoleRoute roles={["ADMIN"]}>
              <AdminClientes />
            </RoleRoute>
          }
        />

        {/* Asistencia - solo RECEPCION y ADMIN */}
        <Route
          path="/asistencia"
          element={
            <RoleRoute roles={["RECEPCION", "ADMIN"]}>
              <Asistencia />
            </RoleRoute>
          }
        />

        {/* 🔹 Ruta por defecto */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
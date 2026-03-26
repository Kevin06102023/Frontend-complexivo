import React from "react";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 Si no hay usuario → lo mandamos al login
  if (!user) {
    window.location.href = "/";
    return null;
  }

  return (
    <div>
      <h2>Dashboard</h2>

      <p>Bienvenido: {user.username}</p>
      <p>Rol: {user.role}</p>

      {/* 🔥 BOTONES PRINCIPALES SEGÚN ROL */}
      <div style={{ marginTop: 20 }}>
        {user.role === "ADMIN" && (
          <>
            <button onClick={() => window.location.href = "/Admin-clientes"}>
              Gestionar Clientes (Admin)
            </button>
            <button onClick={() => window.location.href = "/asistencia"}>
              Control de Asistencia
            </button>
          </>
        )}

        {user.role === "RECEPCION" && (
          <button onClick={() => window.location.href = "/recepcion"}>
            Gestionar Membresías
          </button>
        )}

        {user.role === "ENTRENADOR" && (
          <button onClick={() => window.location.href = "/clientes"}>
            Ver Clientes / Rutinas
          </button>
        )}

        {user.role === "CLIENTE" && (
          <button onClick={() => window.location.href = "/cliente"}>
            Mi Perfil
          </button>
        )}
      </div>

      <hr />

      {/* 🔥 CONTENIDO POR ROL */}
      {user.role === "ADMIN" && (
        <div>
          <h3>Panel Administrador</h3>
          <p>Acceso total al sistema</p>
        </div>
      )}

      {user.role === "RECEPCION" && (
        <div>
          <h3>Panel Recepción</h3>
          <p>Gestión de membresías y asistencia</p>
        </div>
      )}

      {user.role === "ENTRENADOR" && (
        <div>
          <h3>Panel Entrenador</h3>
          <p>Gestión de rutinas y clientes</p>
        </div>
      )}

      {user.role === "CLIENTE" && (
        <div>
          <h3>Panel Cliente</h3>
          <p>Ver mi información, dieta, rutinas y QR</p>
        </div>
      )}

      <hr />

      {/* 🔥 LOGOUT */}
      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Dashboard;
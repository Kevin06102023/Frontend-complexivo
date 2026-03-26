import React from "react";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "/";
    return null;
  }

  return (
    <div style={{
      maxWidth: "800px",
      margin: "50px auto",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "10px",
      fontFamily: "Arial, sans-serif",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      textAlign: "center"
    }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Dashboard</h2>

      <p style={{ fontSize: "18px", fontWeight: "bold" }}>Bienvenido: {user.username}</p>
      <p style={{ fontSize: "16px", color: "#555" }}>Rol: {user.role}</p>

      {/* BOTONES PRINCIPALES SEGÚN ROL */}
      <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
        {user.role === "ADMIN" && (
          <>
            <button
              onClick={() => window.location.href = "/Admin-clientes"}
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#007BFF",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              Gestionar Clientes (Admin)
            </button>
            <button
              onClick={() => window.location.href = "/asistencia"}
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#28a745",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              Control de Asistencia
            </button>
          </>
        )}

        {user.role === "RECEPCION" && (
          <button
            onClick={() => window.location.href = "/recepcion"}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#17a2b8",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Gestionar Membresías
          </button>
        )}

        {user.role === "ENTRENADOR" && (
          <button
            onClick={() => window.location.href = "/clientes"}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#ffc107",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Ver Clientes / Rutinas
          </button>
        )}

        {user.role === "CLIENTE" && (
          <button
            onClick={() => window.location.href = "/cliente"}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#6f42c1",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Mi Perfil
          </button>
        )}
      </div>

      <hr style={{ margin: "30px 0", borderColor: "#ddd" }} />

      {/* CONTENIDO POR ROL */}
      {user.role === "ADMIN" && (
        <div style={{ backgroundColor: "#e3f2fd", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
          <h3>Panel Administrador</h3>
          <p>Acceso total al sistema</p>
        </div>
      )}

      {user.role === "RECEPCION" && (
        <div style={{ backgroundColor: "#d1ecf1", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
          <h3>Panel Recepción</h3>
          <p>Gestión de membresías y asistencia</p>
        </div>
      )}

      {user.role === "ENTRENADOR" && (
        <div style={{ backgroundColor: "#fff3cd", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
          <h3>Panel Entrenador</h3>
          <p>Gestión de rutinas y clientes</p>
        </div>
      )}

      {user.role === "CLIENTE" && (
        <div style={{ backgroundColor: "#e2d9f3", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
          <h3>Panel Cliente</h3>
          <p>Ver mi información, dieta, rutinas y QR</p>
        </div>
      )}

      <hr style={{ margin: "30px 0", borderColor: "#ddd" }} />

      {/* LOGOUT */}
      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
        style={{
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#dc3545",
          color: "#fff",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Dashboard;
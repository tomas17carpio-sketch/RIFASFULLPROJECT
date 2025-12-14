export default function RifaCard({ titulo, descripcion, precio }) {
  return (
    <div style={{
      background: "#fff",
      padding: "25px",
      borderRadius: "12px",
      border: "1px solid #e5e5e5",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      marginBottom: "25px"
    }}>
      <h3 style={{ marginBottom: "8px", color: "#111" }}>{titulo}</h3>

      <p style={{ marginBottom: "12px", color: "#444" }}>{descripcion}</p>

      <button style={{
        background: "#111",
        color: "#fff",
        padding: "10px 18px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontWeight: "600",
        marginTop: "10px"
      }}>
        Participar – {precio}
      </button>
    </div>
  );
}
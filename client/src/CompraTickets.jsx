import React from "react";
import TicketForm from "./TicketForm";

export default function CompraTickets() {
  const handleSubmit = async (data) => {
    try {
      const res = await fetch("/api/comprar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error en la compra");

      const result = await res.json();
      alert(result.message);
    } catch (err) {
      console.error(err);
      alert("Error al registrar la compra: " + err.message);
    }
  };

  return <TicketForm onSubmit={handleSubmit} />;
}

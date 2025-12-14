import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/*
  RegistroTickets:
  - Selección de cantidad con botones +/-
  - Navega a /payment?qty=NN usando react-router (navigate)
  - Valida min y max
*/

const RegistroTickets = () => {
  const [qty, setQty] = useState(1);
  const MIN = 1;
  const MAX = 100;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = Number(e.target.value) || 0;
    if (value < MIN) return setQty(MIN);
    if (value > MAX) return setQty(MAX);
    setQty(value);
  };

  const increment = () => setQty((q) => Math.min(MAX, q + 1));
  const decrement = () => setQty((q) => Math.max(MIN, q - 1));

  const handleBuy = () => {
    navigate(`/payment?qty=${encodeURIComponent(qty)}`);
  };

  return (
    <section className="form-container" aria-labelledby="compra-ticket-title">
      <h3 id="compra-ticket-title" style={{ color: "#ffd700" }}>
        Comprar tickets
      </h3>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <button type="button" className="btn" onClick={decrement} aria-label="Disminuir" disabled={qty <= MIN}>
          −
        </button>
        <input
          aria-label="Cantidad de tickets"
          type="number"
          min={MIN}
          max={MAX}
          value={qty}
          onChange={handleChange}
          style={{ width: 80, textAlign: "center" }}
        />
        <button type="button" className="btn" onClick={increment} aria-label="Aumentar" disabled={qty >= MAX}>
          +
        </button>
      </div>

      <p style={{ marginTop: 12, color: "#fff" }}>
        Seleccionaste: <strong style={{ color: "#ffd700" }}>{qty}</strong> ticket{qty > 1 ? "s" : ""}
      </p>

      <div style={{ marginTop: 12 }}>
        <button
          className="btn btn--primary"
          onClick={handleBuy}
          disabled={qty < 1}
          aria-disabled={qty < 1}
        >
          Comprar
        </button>
      </div>
    </section>
  );
};

export default RegistroTickets;
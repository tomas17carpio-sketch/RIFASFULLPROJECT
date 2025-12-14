import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/*
  RegistroTickets — formulario minimalista, accesible y profesional.
  Campos: Nombre*, Apellido*, Prefijo + Cédula*, Teléfono (opcional VZ), Email (opcional)
  Cantidad 1..9999 y botón Comprar.
*/

const RegistroTickets = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [prefix, setPrefix] = useState("V");
  const [cedulaNum, setCedulaNum] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const MIN = 1;
  const MAX = 9999;
  const navigate = useNavigate();

  const cleanDigits = (s) => String(s || "").replace(/\D/g, "");
  const clamp = (n) => {
    const v = Number(n) || MIN;
    if (v < MIN) return MIN;
    if (v > MAX) return MAX;
    return Math.trunc(v);
  };

  const isValidCedula = (ced) => {
    const d = cleanDigits(ced);
    return /^\d{6,10}$/.test(d);
  };

  const isValidVenezuelanPhone = (phone) => {
    if (!phone) return true; // opcional
    const digits = cleanDigits(phone);
    return /^(?:0?(422|412|414|424|416|426)\d{7})$/.test(digits);
  };

  const handleQty = (v) => setQty(clamp(v));
  const inc = () => setQty((q) => clamp(q + 1));
  const dec = () => setQty((q) => clamp(q - 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!nombre.trim() || !apellido.trim()) { setError("Nombre y apellido son obligatorios."); return; }
    if (!cedulaNum.trim() || !isValidCedula(cedulaNum)) { setError("Cédula inválida (6-10 dígitos)."); return; }
    if (telefono && !isValidVenezuelanPhone(telefono)) { setError("Teléfono inválido. Prefijos aceptados: 0422/0412/0414/0424/0416/0426."); return; }

    const cedulaClean = `${prefix.toUpperCase()}-${cleanDigits(cedulaNum)}`;
    const safeQty = clamp(qty);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          cedula: cedulaClean,
          email: email.trim(),
          telefono: telefono.trim(),
          qty: safeQty
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Error al guardar. Intenta nuevamente.");
        setLoading(false);
        return;
      }
      navigate(`/payment?clientId=${encodeURIComponent(data.id)}`);
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor.");
      setLoading(false);
    }
  };

  return (
    <form className="registro" onSubmit={handleSubmit} noValidate>
      <div className="row">
        <label className="label">
          Nombre *
          <input className="input" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={loading} />
        </label>

        <label className="label">
          Apellido *
          <input className="input" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} disabled={loading} />
        </label>
      </div>

      <div className="row small-gutter">
        <label className="label small">
          Prefijo
          <select className="select" value={prefix} onChange={(e) => setPrefix(e.target.value)} disabled={loading}>
            <option>V</option><option>E</option><option>P</option><option>R</option><option>X</option>
          </select>
        </label>

        <label className="label" style={{flex:1}}>
          Cédula *
          <input className="input" placeholder="Cédula (sin puntos)" value={cedulaNum} onChange={(e) => setCedulaNum(e.target.value)} disabled={loading} />
        </label>
      </div>

      <label className="label">
        Teléfono (opcional)
        <input className="input" placeholder="0422-1234567" value={telefono} onChange={(e) => setTelefono(e.target.value)} disabled={loading} />
        <small className="hint">Aceptadas: 0422 / 0412 / 0414 / 0424 / 0416 / 0426</small>
      </label>

      <label className="label">
        Correo electrónico (opcional)
        <input className="input" placeholder="correo@ejemplo.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
      </label>

      <div className="qty-area">
        <div className="qty-controls">
          <button type="button" className="qty-btn" onClick={dec} disabled={loading || qty<=MIN}>−</button>
          <input className="qty-input" type="number" min={MIN} max={MAX} value={qty} onChange={(e) => handleQty(e.target.value)} disabled={loading} />
          <button type="button" className="qty-btn" onClick={inc} disabled={loading || qty>=MAX}>+</button>
        </div>
        <p className="selected">Seleccionaste: <strong>{qty.toLocaleString()}</strong> ticket{qty>1?'s':''}</p>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="actions">
        <button className="primary" type="submit" disabled={loading}>{loading ? "Procesando..." : "Comprar"}</button>
      </div>
    </form>
  );
};

export default RegistroTickets;
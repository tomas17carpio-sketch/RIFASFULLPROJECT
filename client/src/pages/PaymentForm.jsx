import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../services/api";
import FooterLegalHome from "../components/FooterLegalHome";

const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedNumbers, totalAmount } = location.state || {
    selectedNumbers: [],
    totalAmount: 0,
  };

  const [payerName, setPayerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [loading, setLoading] = useState(false);

  // Manejo del cambio de archivo
  const handleFileChange = (e) => {
    setPaymentSlip(e.target.files[0]);
  };

  // Enviar comprobante
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!payerName || !phoneNumber || !paymentSlip) {
      alert("Por favor completa todos los campos y sube tu comprobante.");
      return;
    }

    const formData = new FormData();
    formData.append("payerName", payerName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("amount", totalAmount);
    formData.append("numbers", JSON.stringify(selectedNumbers));
    formData.append("paymentSlip", paymentSlip);

    try {
      setLoading(true);
      const response = await axios.post("/payments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);

      if (response.data.success) {
        navigate("/confirmation", {
          state: {
            message: "Pago enviado correctamente. Espera la validación.",
            selectedNumbers,
            totalAmount,
          },
        });
      } else {
        alert("Error al enviar el pago: " + response.data.message);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error al enviar el pago. Intenta nuevamente.");
    }
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Formulario de Pago</h1>

      <div className="mb-4">
        <strong>Números seleccionados:</strong>{" "}
        {selectedNumbers.length > 0 ? selectedNumbers.join(", ") : "Ninguno"}
      </div>
      <div className="mb-4">
        <strong>Total a pagar:</strong> ${totalAmount}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md bg-white p-6 rounded shadow"
      >
        <label className="mb-2">
          Nombre del titular:
          <input
            type="text"
            value={payerName}
            onChange={(e) => setPayerName(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
          />
        </label>

        <label className="mb-2">
          Número de teléfono (Pago Móvil):
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
          />
        </label>

        <label className="mb-4">
          Subir comprobante de pago:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full mt-1"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar Pago"}
        </button>
      </form>

      {/* Footer Legal */}
      <div className="mt-auto w-full">
        <FooterLegalHome />
      </div>
    </div>
  );
};

export default PaymentForm;

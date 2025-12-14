import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FooterLegalHome from "../components/FooterLegalHome";

const SelectNumber = () => {
  const navigate = useNavigate();

  // Estado de números disponibles (del 1 al 50 por ejemplo)
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const ticketPrice = 5; // Precio por ticket, puedes cambiarlo
  const [totalAmount, setTotalAmount] = useState(0);

  // Inicializa los números disponibles
  useEffect(() => {
    const numbers = [];
    for (let i = 1; i <= 50; i++) {
      numbers.push(i);
    }
    setAvailableNumbers(numbers);
  }, []);

  // Manejo de selección de números
  const toggleNumber = (num) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  // Actualiza el monto total
  useEffect(() => {
    setTotalAmount(selectedNumbers.length * ticketPrice);
  }, [selectedNumbers]);

  // Continuar al pago
  const handleContinue = () => {
    if (selectedNumbers.length === 0) {
      alert("Por favor selecciona al menos un número.");
      return;
    }
    // Aquí puedes enviar selectedNumbers al contexto o state global si quieres
    navigate("/payment", { state: { selectedNumbers, totalAmount } });
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Selecciona tus números</h1>

      <div className="grid grid-cols-5 gap-2 mb-6">
        {availableNumbers.map((num) => (
          <button
            key={num}
            onClick={() => toggleNumber(num)}
            className={`p-3 rounded ${
              selectedNumbers.includes(num)
                ? "bg-green-500 text-white"
                : "bg-white border border-gray-300"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <strong>Números seleccionados:</strong>{" "}
        {selectedNumbers.length > 0 ? selectedNumbers.join(", ") : "Ninguno"}
      </div>

      <div className="mb-4">
        <strong>Total a pagar:</strong> ${totalAmount}
      </div>

      <button
        onClick={handleContinue}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Continuar al pago
      </button>

      {/* Footer Legal */}
      <div className="mt-auto w-full">
        <FooterLegalHome />
      </div>
    </div>
  );
};

export default SelectNumber;

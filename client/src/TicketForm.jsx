import { useState } from "react";

export default function TicketForm({ onSubmit = async () => console.log("onSubmit no definido") }) {
  const [form, setForm] = useState({
    nombreCompleto: "",
    cedula: "",
    telefono: "",
    correo: "",
    tickets: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(form);
    } catch (err) {
      console.error("Error al enviar:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-400">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Comprar Tickets</h2>
        
        <input 
          type="text" 
          name="nombreCompleto" 
          placeholder="Nombre y Apellido" 
          value={form.nombreCompleto} 
          onChange={handleChange} 
          className="mb-4 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
          required 
        />
        <input 
          type="text" 
          name="cedula" 
          placeholder="Cédula" 
          value={form.cedula} 
          onChange={handleChange} 
          className="mb-4 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
          required 
        />
        <input 
          type="tel" 
          name="telefono" 
          placeholder="Teléfono" 
          value={form.telefono} 
          onChange={handleChange} 
          className="mb-4 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
          required 
        />
        <input 
          type="email" 
          name="correo" 
          placeholder="Correo electrónico" 
          value={form.correo} 
          onChange={handleChange} 
          className="mb-4 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
          required 
        />
        <input 
          type="number" 
          name="tickets" 
          value={form.tickets} 
          min="1" 
          onChange={handleChange} 
          className="mb-6 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
          required 
        />
        
        <button 
          type="submit" 
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition-all duration-200"
        >
          Comprar
        </button>
      </form>
    </div>
  );
}

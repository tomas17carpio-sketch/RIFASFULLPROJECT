// Ruta: client/src/pages/Home.jsx
import React from "react";
import FooterLegal from "../components/FooterLegalHome";
import RaffleCard from "../components/RaffleCard";

const Home = () => {
  const rifas = [
    {
      id: 1,
      title: "Rifa de Moto",
      description: "Gana una moto 0km.",
      price: 10,
    },
    {
      id: 2,
      title: "Rifa de Teléfono",
      description: "Un smartphone último modelo.",
      price: 5,
    },
    {
      id: 3,
      title: "Rifa de Playstation",
      description: "Una PS5 completamente nueva.",
      price: 8,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="p-6 bg-blue-600 text-white">
        <h1 className="text-2xl font-bold">APROVECHA TU SUERTE 🍀 </h1>
      </header>

      <main className="p-6">
        <h2 className="text-xl font-semibold mb-4">Rifas Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rifas.map((r) => (
            <RaffleCard key={r.id} raffle={r} />
          ))}
        </div>
      </main>

      <FooterLegal />
    </div>
  );
};

export default Home;

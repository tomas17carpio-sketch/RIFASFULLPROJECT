// RaffleCard.jsx
export default function RaffleCard({ raffle }) {
  if (!raffle) {
    return <div>Error: no hay datos de la rifa.</div>;
  }

  return (
    <div className="raffle-card">
      <h3>{raffle.title}</h3>
      <p>{raffle.description}</p>
      <p>Precio: {raffle.price}</p>
    </div>
  );
}

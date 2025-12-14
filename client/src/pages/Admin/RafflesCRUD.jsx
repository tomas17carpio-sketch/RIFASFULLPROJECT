// RafflesCRUD.jsx - minimal admin CRUD for raffles - Editor: Tomas Galea
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function RafflesCRUD() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title:'', description:'', price:0 });
  useEffect(()=>{ api.get('/raffles/active').then(r=>setList(r.data)).catch(()=>{}); }, []);
  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post('/raffles', form);
      alert('Creada');
      window.location.reload();
    } catch (err) { alert('Error'); }
  };
  return (
    <div>
      <h3>Crear rifa</h3>
      <form onSubmit={create} style={{display:'grid', gap:8, maxWidth:480}}>
        <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Título" />
        <input value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Descripción" />
        <input type="number" value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})} placeholder="Precio" />
        <button type="submit">Crear</button>
      </form>

      <h3 style={{marginTop:20}}>Rifas</h3>
      {list.map(r => (
        <div key={r.id} className="card" style={{marginBottom:8}}>
          <p><strong>{r.title}</strong> — {r.price} Bs</p>
        </div>
      ))}
    </div>
  );
}

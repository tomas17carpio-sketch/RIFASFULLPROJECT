import { useState } from 'react';
import api from '../services/api';

export default function Register() {
  const [username,setUsername]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, email, password });
      alert('Registrado. Inicia sesión.');
      window.location = '/login';
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };
  return (
    <div className="card" style={{maxWidth:480, margin:'0 auto'}}>
      <h2>Registrarse</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8}}>
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Usuario" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña" />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

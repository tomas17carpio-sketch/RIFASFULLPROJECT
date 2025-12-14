import { useState } from 'react';
import api from '../services/api';

export default function Login() {
  const [username,setUsername]=useState(''); const [password,setPassword]=useState('');
  const submit = async (e) => {
    e.preventDefault();
    try {
      const r = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', r.data.token);
      alert('Login OK');
      window.location = '/';
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };
  return (
    <div className="card" style={{maxWidth:480, margin:'0 auto'}}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8}}>
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Usuario" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

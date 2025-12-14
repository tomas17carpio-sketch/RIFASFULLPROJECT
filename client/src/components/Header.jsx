// Header.jsx - Editor: Tomas Galea
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const token = localStorage.getItem('token');
  return (
    <header style={{background:'#0f172a', color:'#fff', padding:12}}>
      <div className="container" style={{display:'flex', justifyContent:'space-between'}}>
        <div><Link to="/" style={{color:'#fff', textDecoration:'none'}}>RIFASFULLPROJECT</Link></div>
        <nav>
          <Link to="/" style={{color:'#fff', marginRight:12}}>Inicio</Link>
          {!token && <Link to="/login" style={{color:'#fff', marginRight:12}}>Login</Link>}
          {!token && <Link to="/register" style={{color:'#fff'}}>Registro</Link>}
          {token && <Link to="/select" style={{color:'#fff', marginLeft:12}}>Comprar</Link>}
        </nav>
      </div>
    </header>
  );
}

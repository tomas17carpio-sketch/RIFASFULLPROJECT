// AdminLayout.jsx - Editor: Tomas Galea
import React from 'react';
import Header from '../components/Header';

export default function AdminLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="container" style={{marginTop:16}}>
        <h2>Admin</h2>
        <div>{children}</div>
      </div>
    </div>
  );
}

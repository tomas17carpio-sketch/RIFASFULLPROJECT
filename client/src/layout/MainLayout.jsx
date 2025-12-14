// MainLayout.jsx - Editor: Tomas Galea
import React from 'react';
import Header from '../components/Header';
import FooterLegal from '../components/FooterLegal';

export default function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <main className="container" style={{marginTop:16}}>
        {children}
      </main>
      <FooterLegal />
    </div>
  );
}

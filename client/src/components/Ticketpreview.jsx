// TicketPreview.jsx - Editor: Tomas Galea
import React from 'react';

export default function TicketPreview({
  raffleName='Rifa',
  buyerName='Cliente',
  ticketNumber='00',
  price='0',
  reference='REF123',
  date=(new Date()).toLocaleString()
}) {
  return (
    <div style={{maxWidth:360, margin:'0 auto', background:'#fff', padding:16, borderRadius:8, boxShadow:'0 2px 6px rgba(0,0,0,0.1)'}}>
      <div style={{textAlign:'center', borderBottom:'1px solid #eee', paddingBottom:8}}>
        <h2 style={{margin:0,color:'#0b6'}}>TICKET DE PARTICIPACIÓN</h2>
        <small style={{color:'#777'}}>RIFASFULLPROJECT - Venezuela</small>
      </div>
      <div style={{marginTop:12}}>
        <div style={{display:'flex', justifyContent:'space-between'}}><strong>Rifa:</strong><span>{raffleName}</span></div>
        <div style={{display:'flex', justifyContent:'space-between'}}><strong>Participante:</strong><span>{buyerName}</span></div>
        <div style={{display:'flex', justifyContent:'space-between'}}><strong>Número:</strong><span style={{color:'#0b6', fontWeight:'700'}}>{ticketNumber}</span></div>
        <div style={{display:'flex', justifyContent:'space-between'}}><strong>Monto:</strong><span>{price} Bs</span></div>
        <div style={{display:'flex', justifyContent:'space-between'}}><strong>Referencia:</strong><span style={{fontFamily:'monospace'}}>{reference}</span></div>
        <div style={{display:'flex', justifyContent:'space-between'}}><strong>Fecha:</strong><span>{date}</span></div>
      </div>
      <div style={{textAlign:'center', marginTop:12, borderTop:'1px solid #eee', paddingTop:8}}>
        <small style={{color:'#777'}}>Guardar captura para verificación.</small>
      </div>
    </div>
  );
}

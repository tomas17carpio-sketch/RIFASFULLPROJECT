// src/components/ComponenteIA.jsx
import React from "react";

export default function ComponenteIA({ instrucciones, codigoGenerado }) {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Componente Generado por IA</h2>

      {instrucciones && (
        <div className="mb-4 p-3 bg-gray-100 rounded shadow">
          <h3 className="font-semibold">Instrucciones Recibidas:</h3>
          <pre className="whitespace-pre-wrap">{instrucciones}</pre>
        </div>
      )}

      {codigoGenerado ? (
        <div className="p-3 bg-white rounded shadow border border-gray-200">
          <h3 className="font-semibold mb-2">Código Generado:</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-800">{codigoGenerado}</pre>
        </div>
      ) : (
        <p className="text-center text-gray-500">El código generado aparecerá aquí...</p>
      )}
    </div>
  );
}

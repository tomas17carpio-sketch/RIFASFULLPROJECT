// client/src/components/FooterLegalHome.jsx
import React from "react";

const FooterLegalHome = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 p-4 text-sm mt-10 border-t border-gray-300">
      <div className="max-w-4xl mx-auto">
        <h4 className="font-semibold mb-2">AVISO LEGAL:</h4>
        <p>
          RIFAS FULL PROJECT es una actividad privada de carácter recreativo que organiza rifas digitales de acceso voluntario. Esta plataforma no es una lotería oficial ni está vinculada a organismos estatales o entidades financieras.
        </p>
        <p className="mt-2">
          La participación implica la aceptación de sus reglas, la verificación manual de pagos y los criterios de selección del ganador previamente publicados. El organizador podrá anular operaciones no verificadas o conductas irregulares.
        </p>
        <p className="mt-2">
          Los premios se entregan únicamente al ganador validado según los datos registrados. Esta actividad no constituye inversión ni ofrece retornos económicos garantizados.
        </p>
        <p className="mt-2">
          Para información o soporte, utilice los canales oficiales.
        </p>
      </div>
    </footer>
  );
};

export default FooterLegalHome;

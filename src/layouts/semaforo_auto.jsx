import { useState, useEffect } from "react";
import { Button } from "primereact/button";

const SemaforoAuto = () => {
  const [cambio, set_cambio] = useState(0);
  const [activo, set_activo] = useState(false);

  useEffect(() => {
    if (activo) {
      const interval = setInterval(() => {
        set_cambio(prev => (prev === 2 ? 0 : prev + 1));
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [activo]);

  return (
    <div>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: cambio === 0 ? 'red' : 'grey',  
          borderRadius: "50%",
          margin: '10px'
        }}
      >
      </div>

      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: cambio === 1 ? 'yellow' : 'grey', 
          borderRadius: "50%",
          margin: '10px'
        }}
      >
      </div>

      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: cambio === 2 ? 'green' : 'grey', 
          borderRadius: "50%",
          margin: '10px'
        }}
      >
      </div>        
      
      <Button
        onClick={() => set_activo(!activo)}
        label={activo ? "Detener" : "Mostrar"}
      />
    </div>
  );
};

export default SemaforoAuto;
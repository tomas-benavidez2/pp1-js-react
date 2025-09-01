import { useState } from "react";
import { Button } from "primereact/button";


const OcultarTexto = () => {
  const [visible, set_visible] = useState(true);

  return (
    <div>
      <Button
        onClick={() => set_visible(!visible)}
        label={visible ? "Ocultar" : "Mostrar"}
      />
      {visible && <h3>Hola, React</h3>}
    </div>
  );
};

export default OcultarTexto;
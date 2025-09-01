import { useState } from "react";
import { Button } from "primereact/button";



const Semaforo = () =>{

  
  const [cambio, set_cambio] = useState(0);

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
        
          


        <Button onClick={() => set_cambio(cambio === 2 ? 0 : cambio + 1)}>Cambio color</Button>

      </div>

        )

};

export default Semaforo;
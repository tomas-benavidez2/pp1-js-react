import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';

const ListaPersonas = () => {
    const [personas, set_personas] = useState([]);

     useEffect(() => {
        const personas_guardadas = localStorage.getItem('personas');

        if (personas_guardadas){
            set_personas(JSON.parse(personas_guardadas));
        }
     }, []);

     return (
        <Card title= "Personas Guardadas">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Nombre</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Email</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Color Favorito</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map((persona, index) =>(
                        <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '8px' }}>{persona.nombre}</td>
                            <td style={{ padding: '8px' }}>{persona.email}</td>
                            <td style={{ padding: '8px' }}>{persona.color}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            
            {personas.length === 0 && <p>No hay personas guardadas todavía.</p>}

        </Card>
     );
};

export default ListaPersonas;
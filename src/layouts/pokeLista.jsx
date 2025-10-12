import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';

const ListadosPoke = () => {
    
    const [pokemones, setPokemones] = useState([]);
    const [habilidades, setHabilidades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

   
    const [mostrarDialogo, setMostrarDialogo] = useState(false);
    const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);
    const [cargandoDetalles, setCargandoDetalles] = useState(false);

   
    const navigate = useNavigate();

    const obtenerIdDeUrl = (url) => {
        const partes = url.split('/');
        return partes[partes.length - 2];
    };

    const cargarDatos = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await Promise.all([
                fetch('https://pokeapi.co/api/v2/pokemon?limit=50'),
                fetch('https://pokeapi.co/api/v2/ability?limit=50')
            ]);

            for (const respuesta of res) {
                if (!respuesta.ok) throw new Error('Falló una de las peticiones');
            }

            const [datosPokemon, datosHabilidades] = await Promise.all(res.map(res => res.json()));

            const pokemonesProcesados = datosPokemon.results.map(p => ({ ...p, id: obtenerIdDeUrl(p.url) }));
            const habilidadesProcesadas = datosHabilidades.results.map(a => ({ ...a, id: obtenerIdDeUrl(a.url) }));

            setPokemones(pokemonesProcesados);
            setHabilidades(habilidadesProcesadas);

        } catch (err) {
            setError('Ocurrió un error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
 
        cargarDatos();
    }, []);


    const alHacerClicEnFila = async (evento) => {
        const pokemon = evento.data;
        setMostrarDialogo(true);
        setCargandoDetalles(true);

        try {
            const respuesta = await fetch(pokemon.url);
            if (!respuesta.ok) throw new Error(`No se pudieron cargar los detalles de ${pokemon.name}`);
            const detalles = await respuesta.json();
            setPokemonSeleccionado(detalles);
        } catch (err) {
            console.error(err);
        } finally {
            setCargandoDetalles(false);
        }
    };
    
    const formatoIndice = (datosFila, opciones) => {
        return opciones.rowIndex + 1;
    };

    return (
        <Card title="Listados de Pokemon y Habilidades">
            <div className="p-mb-2" style={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                    label={'Recargar Datos'}
                    icon="pi pi-refresh"
                    onClick={cargarDatos}
                    disabled={loading}
                />
                <Button
                    label="Volver al Inicio"
                    icon="pi pi-home"
                    onClick={() => navigate('/')}
                  
                />
            </div>

            {loading && <div style={{ textAlign: 'center', padding: '1rem' }}><ProgressSpinner /></div>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {!loading && !error && pokemones.length > 0 && (
                <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        <h3>Pokémon</h3>
                        <DataTable 
                            value={pokemones} 
                            selectionMode="single"
                            onRowClick={alHacerClicEnFila}
                            style={{ cursor: 'pointer' }}
                        >
                            <Column header="#" body={formatoIndice}></Column>
                            <Column field="id" header="ID"></Column>
                            <Column field="name" header="Nombre"></Column>
                        </DataTable>
                    </div>

                    <div style={{ flex: 1 }}>
                        <h3>Habilidades</h3>
                        <DataTable value={habilidades}>
                            <Column header="#" body={formatoIndice}></Column>
                            <Column field="id" header="ID"></Column>
                            <Column field="name" header="Habilidad"></Column>
                        </DataTable>
                    </div>
                </div>
            )}
            
            <Dialog 
                header={`Detalles de: ${pokemonSeleccionado?.name}`}
                visible={mostrarDialogo} 
                style={{ width: '50vw' }} 
                onHide={() => setMostrarDialogo(false)}
            >
                {cargandoDetalles ? (
                    <ProgressSpinner />
                ) : pokemonSeleccionado ? (
                    <div>
                        <img src={pokemonSeleccionado.sprites.front_default} alt={pokemonSeleccionado.name} style={{width: '150px'}} />
                        <p><strong>Altura:</strong> {pokemonSeleccionado.height / 10} m</p>
                        <p><strong>Peso:</strong> {pokemonSeleccionado.weight / 10} kg</p>
                        <strong>Tipos:</strong>
                        <ul>
                            {pokemonSeleccionado.types.map(infoTipo => <li key={infoTipo.type.name}>{infoTipo.type.name}</li>)}
                        </ul>
                    </div>
                ) : (
                    <p>No se pudieron cargar los detalles.</p>
                )}
            </Dialog>
        </Card>
    );
};

export default ListadosPoke;
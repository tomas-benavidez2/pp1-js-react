import { useRef, useState, Fragment } from "react";
import {Card} from 'primereact/card'
import {InputText} from 'primereact/inputtext'
import {SelectButton} from 'primereact/selectbutton'
import {Button} from 'primereact/button'
import { Toast } from 'primereact/toast';
import Swal from 'sweetalert2'

const opcionesColor = [
    {label:'Rojo', value:'red'},
    {label:'Amarillo', value:'yellow'},
    {label:'Verde', value:'green'},
]

const Tarjeta = () =>{
    const[nombre, setNombre] = useState("")
    const[email, setEmail] = useState("")
    const[color, setColor] = useState('gray')
    const[terminos, setTerminos] = useState(false)
    const [intentadoGuardar, setIntentadoGuardar] = useState(false)
    const toast = useRef(null)

    const guardar_en_local_storage = (persona) =>{
        const existente = localStorage.getItem('personas')
        const lista = existente ? JSON.parse(existente) : []    
        lista.push(persona)
        localStorage.setItem('personas', JSON.stringify(lista))    
    }

    const form_completo = ()=>{
            const nombreValido = nombre.trim() !== '';
            const emailValido = email.trim() !== '' && email.includes('@') && email.includes('.');
            const terminosAceptados = terminos === true;
             

            return nombreValido && emailValido && terminosAceptados;

    }

    const confirmarFormulario = ()=>{
        Swal.fire({
            title:'¿Desea confirmar los datos?',
            text:`Nombre: ${nombre || "Sin nombre"} |
                Email: ${email || "Sin email"} |
                Color: ${color !== 'gray' ? opcionesColor.find((item)=>item.value === color).label : 'Gris'} |
                Terminos: ${terminos }`,
            icon:'question',
            showCancelButton:true,
            confirmButtonText:'Si, guardar',
            cancelButtonText:'Cancelar'
        }).then((result)=>{
            if(result.isConfirmed){
                guardar_en_local_storage({
                    nombre:nombre || 'sin nombre',
                    email:email || 'sin Email',
                    color,
                    terminos
                })


                toast.current?.show({
                    severity:'success',
                    summary:'Guardado',
                    detail:'Tarjeta de presentación guardada'
                })
            }
        })
    }

    const nombreError = !nombre.trim() ? 'El nombre es obligatorio.' : null;

    const emailError = !email.trim()
        ? 'El email es obligatorio.'
        : !email.includes('@') || !email.includes('.')
        ? 'El formato del email no es válido.'
        : null;

    return(
        <Fragment>
            <Toast ref={toast}/>

            <Card title='Tarjeta de presentación'>
                <div className="p-fluid" style={{display:'grid'}}>
                    <span className="p-float-label">
                        <InputText
                        id="nombre"
                        value={nombre}
                        onChange={(e)=>setNombre(e.target.value)}
                        required
                        />
                        <label htmlFor="nombre">Nombre</label>
                    </span>
                    {intentadoGuardar && nombreError && <small style={{ color: 'red', marginLeft: '4px' }}>{nombreError}</small>}

                    <span className="p-float-label">
                        <InputText
                        id="Email"
                        value={email}
                        type="email"
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                    </span>
                    {intentadoGuardar && emailError && <small style={{ color: 'red', marginLeft: '4px' }}>{emailError}</small>}
                   
                    <div>
                        <small>Color de favorito</small>
                        <SelectButton
                        value={color}
                        onChange={(e)=>setColor(e.value)}
                        options={opcionesColor}
                        />
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            id="terms"
                            checked={terminos}
                            onChange={(e) => setTerminos(e.target.checked)}
                            required
                        />
                        <label htmlFor="terms">Acepto los términos y condiciones</label>
                    </div>
                                    
 

                    <div style={{display:'flex'}}>
                        <Button 
                        label="Guardar"
                        icon='pi pi-check'
                        severity="success"
                        onClick={() => {
                            setIntentadoGuardar(true); 
                            if (form_completo()) {   
                                confirmarFormulario();
                            }
                        }}
                         />
                        <Button
                        label="Limpiar"
                        icon='pi pi-eraser'
                        severity="secondary"
                        onClick={()=>{
                            setNombre("")
                            setEmail("")
                            setColor('gray')
                            setTerminos(false)
                        }} 
                        />
                    </div>
                </div>
            </Card>
        </Fragment>
    )

}

export default Tarjeta
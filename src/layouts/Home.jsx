import { Fragment } from "react"
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button'

const Home = () => {
    const navigate = useNavigate()

    return(
        <Fragment>
            <h2>
                Mi Home
            </h2>
            <Button onClick={() => navigate('/semaforo')} label="Ir al Semaforo">

            </Button>

            <Button onClick={() => navigate('/tarjeta')} label="Ir al formulario">

            </Button>

        </Fragment>
    )

}

export default Home 
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
            <Button onClick={() => navigate('/tarjeta')} label="Ir al formulario">

            </Button>

            <Button onClick={() => navigate('/personas')} label="Ver la lista de personas">

            </Button>

        </Fragment>
    )

}

export default Home 
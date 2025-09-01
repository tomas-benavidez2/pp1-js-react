
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Semaforo from './layouts/semaforo'
import SemaforoAuto from './layouts/semaforo_auto'
import Tarjeta from './layouts/tarjeta'
import Home from './layouts/Home'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/tarjeta' element={<Tarjeta/>} />
      
    </Routes>  
    </>
  )
}

export default App

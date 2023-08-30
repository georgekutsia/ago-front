import React from 'react'
import { Route, Routes } from "react-router-dom";
import { HomeScreen } from './screens.js';

function Routers() {
  return (
    <div>
        <Routes>
          <Route path="/home" element={<HomeScreen/>} /> {/*Home puede tener login*/}
          <Route path="/login" element={<HomeScreen/>} />
          <Route path="/register" element={<HomeScreen/>} />
          <Route path="/user" element={<HomeScreen/>} /> {/*Edit del perfil de usuario o de worker*/}
          <Route path="/user/:id" element={<HomeScreen/>} /> {/*Usuario o de worker*/}
          <Route path="/comment" element={<HomeScreen/>} /> {/*Ver comentarios y valoraciones sobre el trabajador*/}
          <Route path="/comment/:id/addComment" element={<HomeScreen/>} /> {/*Editar comentarios que has hecho sobre otro trabajador*/}
          <Route path="/company" element={<HomeScreen/>} /> {/*Perfil de companyr*/}
          <Route path="/company/:id" element={<HomeScreen/>} /> {/*Edit de company*/}
          <Route path="/jobs" element={<HomeScreen/>} /> {/*Lista de los trabajadores para filtrar por ellos, ver anuncios etc*/}
        </Routes></div>
  )
}

export default Routers
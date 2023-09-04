import React, { useContext } from 'react'
import { Route, Routes } from "react-router-dom";
import { CompanyScreen, HomeScreen, ProfileScreen, UsersScreen } from './screens/index.js';
import RequireAuth  from "./shared/components/RequireAuth/RequireAuth.jsx";
import { LoggedContext } from './shared/contexts/JwtContext.js';
import Confirm from './components/confirm/Confirm.jsx';

function Routers() {
  const { userData, setUserData } = useContext(LoggedContext);
  return (
    <div>
        <Routes>
          <Route path="/home" element={<HomeScreen/>} /> {/*Home puede tener login*/}
          <Route path="/login" element={<HomeScreen/>} />
          <Route path="/register" element={<HomeScreen/>} />
          <Route path="/users" element={<UsersScreen/>} />
          <Route path="/user/:id/confirm" element={<Confirm/>} />
          <Route path="/profile" element={<RequireAuth><ProfileScreen/></RequireAuth> } /> Ver perfil de usuario
          <Route path={`/profile/${userData?._id}`}element={<RequireAuth><ProfileScreen/></RequireAuth> } /> {/*Editar usuario*/}
          <Route path="/comment" element={<HomeScreen/>} /> {/*Ver comentarios y valoraciones sobre el trabajador*/}
          <Route path="/comment/:id/addComment" element={<HomeScreen/>} /> {/*Editar comentarios que has hecho sobre otro trabajador*/}
          <Route path="/companies" element={<CompanyScreen/>} /> {/*Perfil de companyr*/}
          <Route path="/company/:id" element={<HomeScreen/>} /> {/*Edit de company*/}
          <Route path="/jobs" element={<HomeScreen/>} /> {/*Lista de los trabajadores para filtrar por ellos, ver anuncios etc*/}
        </Routes></div>
  )
}

export default Routers
import React, { useContext, useEffect, useState } from 'react'
import { LoggedContext } from '../../shared/contexts/JwtContext';
import { ButtonComponentEdit, MapView, UserUpdateForm } from '../../components';
import { getOneUser } from '../../shared/services/api';



function ProfileScreen() {
  const { userData, setUserData } = useContext(LoggedContext);
  const [userInfo, setUserInfo] = useState([]);
  const [mapToggle, setMapToggle] = useState(false);
  

  const [update, setUpdate] = useState ()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOneUser(userData?._id);
        setUserInfo(data);
        console.log('%cMyProject%cline:17%cdata', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(153, 80, 84);padding:3px;border-radius:2px', data)
      } catch (error) {
        console.error("Error al obtener datos de la empresa:", error);
      }
    };
    fetchData();
  }, []);
  function formatearFecha(fecha) {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', opciones);
    return fechaFormateada;
  }

  return (
    <div className="profile">
      <section >
        <p>{userInfo?.name}</p>
        <img src={userInfo?.img} alt="User" width={200} />
        <p>{userInfo?.email}</p>
        <p>{userInfo?.phoneNumber}</p>
        <p>{userInfo?.age}</p>
      {userInfo.specialization &&  userInfo.specialization.map((spec, index) =>
        (  <div key={index} className='d-flex'>
            <img src={spec.img} alt={spec.name} width={30} />
            <h5>{spec.name}</h5>
            </div>)) }
      {userInfo.comments &&  userInfo.comments.map((spec, index) =>
        (  <div key={index} className='d-flex'>
            <p>{spec.text}</p>
            </div>)) }
      {userInfo.petitions &&  userInfo.petitions.map((spec, index) =>
        (  <div key={index} className='d-flex'>
            <p>{formatearFecha(spec.day)}</p>
            <p>{spec.direction}</p>
      {spec.hours &&  spec.hours.map((ho, index) =>
      <p>{ho.split("-").join(", ")}</p>
      )}
            
            </div>)) }
        <p>{userInfo?.age}</p>
      {mapToggle &&
        <MapView setLatitude={userData?.map?.x} setLenght={userData?.map?.y}/>
      }
      </section>
      <section>
        <ButtonComponentEdit setClicking={setUpdate} clicked={update} btnText={"Editar perfil"}/>
         <ButtonComponentEdit setClicking={setMapToggle} clicked={mapToggle} btnText={"Ver mapa"}/>
        {update && <UserUpdateForm setUpdate={setUpdate}></UserUpdateForm>}
      </section>
    </div>
  );
}

export default ProfileScreen
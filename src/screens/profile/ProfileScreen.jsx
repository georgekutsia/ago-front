import React, { useContext, useEffect, useState } from 'react'
import { LoggedContext } from '../../shared/contexts/JwtContext';
import { ButtonComponentEdit, MapView, UserUpdateForm } from '../../components';
import { getOneUser } from '../../shared/services/api';
import { Link } from 'react-router-dom';



function ProfileScreen() {
  const { userData, setUserData } = useContext(LoggedContext);
  const [userInfo, setUserInfo] = useState([]);
  const [mapToggle, setMapToggle] = useState(false);
  const [toggleSpecialization, setToggleSpecialization] = useState(false)
  const [toggleForm, setToggleForm] = useState(false)

  const [update, setUpdate] = useState ()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOneUser(userData?._id);
        setUserInfo(data);
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
        <p>{userInfo?.description}</p>
        <img src={userInfo?.img} alt="User" width={200} />
        <p>{userInfo?.name}</p>
        <p>{userInfo?.email}</p>
        <p>{userInfo?.phoneNumber}</p>
        <p>{userInfo?.age}</p>
        <ul className='ul-profile'>
          <li><Link ><i className="fa-solid fa-users prof-btn"></i></Link></li>
          <li><Link ><i className="fa-solid fa-comments prof-btn"></i></Link></li>
          <li><Link onClick={()=>setToggleSpecialization(!toggleSpecialization)}><i className="fa-solid fa-briefcase prof-btn"></i></Link></li>
      </ul>
      {toggleSpecialization && userInfo.specialization &&  userInfo.specialization.map((spec, index) =>
        (  <div key={index} className='d-flex' data-aos="zoom-out-right">
            <img src={spec.img} alt={spec.name} width={30} height={30} />
            <div>
            <h5>{spec.name}</h5>
            <p>{spec.description}</p>
            </div>
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
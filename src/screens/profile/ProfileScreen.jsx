import React, { useContext, useEffect, useState } from 'react'
import { deleteUser, logout } from '../../shared/services/api';
import { LoggedContext } from '../../shared/contexts/JwtContext';
import {  MapView, UserUpdateForm } from '../../components';
import { getOneUser } from '../../shared/services/api';
import { Link, useNavigate } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
function ProfileScreen() {
  const { userData, setUserData } = useContext(LoggedContext);
  const [userInfo, setUserInfo] = useState([]);
  const [color, setColor] = useState(true)
  const [mapToggle, setMapToggle] = useState(false);
  const [toggleSpecialization, setToggleSpecialization] = useState(false)
  const [toggleForm, setToggleForm] = useState(false)
  const [update, setUpdate] = useState ()
 
  let navigate = useNavigate();
  const toggleButtons =  () => {
    setUpdate(false)
    setToggleSpecialization(false)
    setToggleForm(false)
    setMapToggle(false)
  }

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
  const handleDeleteUser = async () => {
    try {
      await deleteUser(userInfo?._id);
      logout();
      navigate("/")
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  console.log("ddd",userInfo)

  return (
    <div className="profile" style={{backgroundColor:  color ? `rgba(0, 242, 255, 0.129)`:"#070b0c"}}>
      <section className="profile-section" >
      <section className="profile-section-userInfo">
      <div className="profile-section-userInfo-div" style={{backgroundColor: color? "":"transparent",border: color? "none":"1px solid white" }} >
      <MDBContainer >
      <button className='btn-mode-color'  style={{backgroundColor: color? "":"darkgrey"}}  onClick={()=>setColor(!color)}>{color ? "Modo diurno":"Modo nocturno"}</button>
        <MDBRow  >
          <MDBCol md="9" lg="7" xl="5" className="mt-5" >
            <MDBCard style={{ borderRadius: '15px', backgroundColor: color? "":"transparent", }} >
              <MDBCardBody className="p-1">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0 ">
                    <MDBCardImage className="profile-section-userInfo-img" src={userInfo?.img} alt='Generic placeholder image' fluid />
                  </div>
                  <div className="flex-grow-1 ms-4">
                    <MDBCardTitle McLoa>{userInfo?.name}</MDBCardTitle>
                    <MDBCardText>{userInfo?.age} años</MDBCardText>
                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}>
                      <div>
                        <div>
                          <p className="small text-muted mx-1">Comentarios</p>
                          <p className="mb-4">{userInfo?.comments?.length}</p>
                        </div>
                        <div className="">
                          <p className="small text-muted mx-1">Contactos</p>
                          <p className="mb-4">{userInfo?.contacts?.length}</p>
                        </div>
                      </div>
                      <div>
                      <div>
                        <p className="small text-muted mx-1">Companías</p>
                        <p className="mb-4">{userInfo?.favoriteCompany?.length}</p>
                      </div>
                      <div>
                        <p className="small text-muted mx-1">Peticiones</p>
                        <p className="mb-4">{userInfo?.petitions?.length}</p>
                      </div>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <MDBBtn outline className="me-1 flex-grow-1">Editar</MDBBtn>
                      <MDBBtn style={{backgroundColor:"red"}} className="flex-grow-1" onClick={handleDeleteUser}>Borrar</MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
        <div className='ulInfo'>
          <ul className='ulInfo-profile'>
            <li><Link  ><i className="fa-solid fa-users prof-btn"  style={{color: color? "":"lightgrey"}}></i></Link></li>
            <li><Link onClick={()=>{toggleButtons(); setToggleForm(true)}}><i className="fa-solid fa-comments prof-btn" style={{color: color? "":"lightgrey"}}></i></Link></li>
            <li><Link onClick={()=>{toggleButtons(); setToggleSpecialization(true)}}><i className="fa-solid fa-briefcase prof-btn" style={{color: color? "":"lightgrey"}}></i></Link></li>
            <li><Link  onClick={()=>{toggleButtons(); setUpdate(true)}}><i className="fa-solid fa-pencil prof-btn" style={{color: color? "":"lightgrey"}}></i></Link></li>
            <li><Link  onClick={()=>{toggleButtons(); setMapToggle(true)}}><i className="fa-solid fa-map prof-btn" style={{color: color? "":"lightgrey"}}></i></Link></li>
        </ul>
        <div className='ulInfo-scrollable'>
      {toggleSpecialization && userInfo.specialization &&  userInfo.specialization.map((spec, index) =>
        (  <div style={{marginTop:"20px"}} key={index} className='d-flex' data-aos="zoom-out-right">
            <img src={spec.img} alt={spec.name} width={30} height={30} />
            <div >
            <h5 style={{color: color? "":"lightgrey"}}>{spec.name}</h5>
            <p style={{color: color? "":"lightgrey"}}>{spec.description}</p>
            </div>
            </div>)) }
            {mapToggle &&
        <MapView setLatitude={userData?.map?.x} setLenght={userData?.map?.y}/>
      }
            {/* scrollable de form */}
      {toggleForm &&userInfo.petitions &&  userInfo.petitions.map((spec, index) =>
        (  <div key={index} className='ulInfo-scrollable-box'>
              <div  className='ulInfo-scrollable-form'>
                  <p style={{color: color? "":"lightgrey"}}> {spec.confirmed ? <i style={{color:"orange"}} class="fa-solid fa-circle-check"></i>:<i style={{color:"grey"}} class="fa-solid fa-question"></i>}      <span style={{color:"blue"}}>{index}</span> -Fecha:{formatearFecha(spec.day)}</p>
                  <p style={{color: color? "":"lightgrey"}}>Dirección: {spec.direction}</p>
                    {spec.hours &&  spec.hours.map((ho, index) =>
                    <p style={{color: color? "":"lightgrey"}}>{ho.split("-").join(", ")}</p>
                    )}
                </div>
                    <div className='ulInfo-scrollable-note' style={{color: color? "":"lightgrey"}}>  {spec.note}</div>
                    <button  className='btn-confirm-1'>Confrimar petición</button><button className='btn-confirm-2'>Cerrar petición </button>
                  </div>
            )) }
        </div>
            {/* scrollable de form */}

            <section >
        {update && <UserUpdateForm setUpdate={setUpdate} ></UserUpdateForm>}
      </section>
        </div>
          <div>
          </div>
      </section>
      { userInfo.comments &&  userInfo?.comments?.map((spec, index) =>
        (  <div key={index} className='d-flex'>
            <p>{spec.text}</p>
            </div>)) }

      </section>

    </div>
  );
}

export default ProfileScreen
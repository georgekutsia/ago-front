import React, { useContext, useEffect, useState } from 'react'
import { deleteUser, logout } from '../../shared/services/api';
import { LoggedContext } from '../../shared/contexts/JwtContext';
import { ButtonComponentEdit, MapView, UserUpdateForm } from '../../components';
import { getOneUser } from '../../shared/services/api';
import { Link, useNavigate } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
function ProfileScreen() {
  const { userData, setUserData } = useContext(LoggedContext);
  const [userInfo, setUserInfo] = useState([]);
  const [mapToggle, setMapToggle] = useState(false);
  const [toggleSpecialization, setToggleSpecialization] = useState(false)
  const [toggleForm, setToggleForm] = useState(false)
  let navigate = useNavigate();

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
  const handleDeleteUser = async () => {
    try {
      await deleteUser(userInfo?._id);
      logout();
      navigate("/")
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  
  return (
    <div className="profile">
      <section className="profile-section" >
      <section className="profile-section-userInfo">
      <div  style={{ backgroundColor: '#9de2ff', padding: "30px" }}>
      <MDBContainer>
        <MDBRow >
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-1">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0 ">
                    <MDBCardImage className="profile-section-userInfo-img" src={userInfo?.img} alt='Generic placeholder image' fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
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
            <li><Link  ><i className="fa-solid fa-users prof-btn"></i></Link></li>
            <li><Link onClick={()=>setToggleForm(!toggleForm)}><i className="fa-solid fa-comments prof-btn"></i></Link></li>
            <li><Link onClick={()=>setToggleSpecialization(!toggleSpecialization)}><i className="fa-solid fa-briefcase prof-btn"></i></Link></li>
            <li><Link  onClick={()=>setUpdate(!update)}><i className="fa-solid fa-pencil prof-btn"></i></Link></li>
            <li><Link  onClick={()=>setMapToggle(!mapToggle)}><i className="fa-solid fa-map prof-btn"></i></Link></li>
        </ul>
      {toggleSpecialization && userInfo.specialization &&  userInfo.specialization.map((spec, index) =>
        (  <div key={index} className='d-flex' data-aos="zoom-out-right">
            <img src={spec.img} alt={spec.name} width={30} height={30} />
            <div>
            <h5>{spec.name}</h5>
            <p>{spec.description}</p>
            </div>
            </div>)) }
        </div>
          <div>
          </div>
      </section>
      { userInfo.comments &&  userInfo.comments.map((spec, index) =>
        (  <div key={index} className='d-flex'>
            <p>{spec.text}</p>
            </div>)) }
      {toggleForm &&userInfo.petitions &&  userInfo.petitions.map((spec, index) =>
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
        {update && <UserUpdateForm setUpdate={setUpdate}></UserUpdateForm>}
      </section>
    </div>
  );
}

export default ProfileScreen
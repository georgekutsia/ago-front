import React, { useContext, useEffect, useState } from 'react'
import { ButtonComponentLogRegToggle, GalleryComponent, LoginComponent, RegisterComponent } from '../../components';
import { LoggedContext } from '../../shared/contexts/JwtContext';

function HomeScreen() {
  const [logReg, setLogReg] = useState(false)
  const { userData, setUserData } = useContext(LoggedContext);
  const { setHidden } = useContext(LoggedContext);


  useEffect(() => {
    console.log(userData)
    if(userData){
      setHidden(true);
    }
  }, [userData])
  

  const handleToggle = ()=>{
    setLogReg(!logReg)
  }
  return (
    <div className='homeAGO'>
    {/* <GalleryComponent></GalleryComponent> */}
      {!userData   &&  (
        <>
        <h1 className='h2-ago-reg'>A.G.O.</h1>
          {logReg && <RegisterComponent setLogReg={setLogReg} />}
          {!logReg && <LoginComponent />}
          <ButtonComponentLogRegToggle toggle={handleToggle} logReg={logReg} />
        </>
      )}
      {userData && (
        <>
    <video className='video-back' preload="metadata" autoPlay muted loop  video src="https://res.cloudinary.com/dxnzcewsy/video/upload/v1693888898/video/production_id_4480570_1080p_lqt6qh.mp4"></video>
    <section className='absolute-position'>
        <div className='absolute-position-div1'>
              <h2  className='h2-ago'>A.G.O.</h2>
              <h2>Para y por los trabajadores</h2>
              <h3 className='p-ago'>Nos enorgullece tener una amplia oferta de autónomos y empresas dispuestos a ofrecer sus servicios</h3>
              <div>
              </div>
        </div>
        <div className='videos4'>
                            <div data-aos="fade-right" data-aos-duration="1000" className='v3v'>
                                <video preload="metadata" autoPlay muted loop  video src="https://res.cloudinary.com/dxnzcewsy/video/upload/v1693891144/video/pexels-ron-lach-7482650_2160p_psvyr7.mp4"></video>
                                  <h3>Creado con la idea de ayudar a los autónomos</h3>
                            </div>
                            <div data-aos="fade-left" data-aos-duration="1000" className='v2v'>
                                <video preload="metadata" autoPlay muted loop  video src="https://res.cloudinary.com/dxnzcewsy/video/upload/v1693891145/video/pexels-tima-miroshnichenko-6789586_2160p_ler0pb.mp4"></video>
                                  <h3>Juntando todo tipo de profesiones y aficiones</h3>
                            </div>
                  </div>
                  <div className='videos4'>
                            <div data-aos="fade-right" data-aos-duration="1000" className='v3v'>
                                <video preload="metadata" autoPlay muted loop  video src="https://res.cloudinary.com/dxnzcewsy/video/upload/v1693891137/video/video_2160p_xhkx4h.mp4"></video>
                                  <h3>Haciéndo la vida más fácil, cómoda e interesante</h3>
                            </div>
                            <div data-aos="fade-left" data-aos-duration="1000" className='v2v'>
                                <video preload="metadata" autoPlay muted loop  video src="https://res.cloudinary.com/dxnzcewsy/video/upload/v1693891122/video/production_id_4480445_1080p_anlaze.mp4"></video>
                                  <h3>Te ayudamos a que te centres sólo en lo importante</h3>
                            </div>
                  </div>

            <div className='background-width'>
                  <div className='background-width-div' data-aos="fade-up" data-aos-duration="1000">
                                        <h3>Lucía Montevideo</h3>
                                <img src="https://res.cloudinary.com/dxnzcewsy/image/upload/v1693895254/video/6B83C94489C842BE9405B02F0DAAD17B-es_megmbj.jpg" alt="" />
                                <h5>"Nunca pensé que tendría tantas facilidades para encontrar trabajo"</h5>
                  </div>
                  <div className='background-width-div' data-aos="fade-up" data-aos-duration="1000">
                                        <h3>Carlos Alicante</h3>
                                <img src="https://res.cloudinary.com/dxnzcewsy/image/upload/v1693895007/video/Hacen-falta-trabajadores-en-Espana-del-sector-industrial_jawfhm.webp" alt="" />
                                <h5>"Empecé como junior, ahora dirijo un equipo"</h5>
                  </div>
                  <div className='background-width-div' data-aos="fade-up" data-aos-duration="1000">
                                        <h3>Hermanos Diaz Cabrera</h3>
                                <img src="https://res.cloudinary.com/dxnzcewsy/image/upload/v1693895005/video/techador-constructor-techador-dos-trabajadores-trabajando-estructura-techo-sitio-construccion-concepto-construccion-trabajo-equipo_61243-1064_apf60j.avif" alt="" />
                                <h5>"Es un negocio familiar que ahora podemos compartir con todos"</h5>
                  </div>
            </div>

                  <section className='section-bottom-home' data-aos="fade-up" data-aos-duration="1000">
                      <h3>Únete a una comunidad con más de 25.000 usuarios activos</h3>  
                      <h3>Conviértete en uno de los autónomos que consiguen contactos y trabajo desde la comodidad de su casa gracias a A.G.O. </h3>  
                      <i class="i-home fa-solid fa-utensils"></i><i class="i-home fa-solid fa-hands-praying"></i><i class="i-home fa-solid fa-house-laptop"></i><i class="i-home fa-solid fa-briefcase"></i>
                      <h3>Sígue las actualizaciones y mejoras de esta página para no perderte nunca las últimas facilidades</h3>  
                  <button onClick={()=>setUserData(true)}>UNIRSE</button>
                  </section>
    </section>

        </>
      )}
    </div>
  );
}

export default HomeScreen
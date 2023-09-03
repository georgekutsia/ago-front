import React, { useEffect, useState } from 'react';
import { getUsers } from '../../shared/services/api';
import { NavLink } from 'react-router-dom';

function UsersScreen() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsersData(data);
        console.log('%cMyProject%cline:11%cdata', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(38, 157, 128);padding:3px;border-radius:2px', data)
      } catch (error) {
        console.error("Error al obtener datos de la empresa:", error);
      }
    };
    fetchData();
  }, []);

  const calculateExperience = (startDate, endDate) => {
    let start = new Date(startDate);
    let end = new Date(endDate);

    let yearDiff = end.getUTCFullYear() - start.getUTCFullYear();
    let monthDiff = end.getUTCMonth() - start.getUTCMonth();

    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }

    return { years: yearDiff, months: monthDiff };
  };

  return (
    <div className='usersScreen'>
      {usersData?.map((user, index) => (
        <section className='usersScreen-section' key={index} data-aos="fade-right" >
          <div className='usersScreen-section-divImg' >
            <img src={user.img} alt={user.name} />
            <h4>{user.name}</h4>
          </div>
          {/* es feo que se vea la dirección completa, pero sí al menos la ciudad, así que esto apaña que de  Calle del Sol, 78, Valencia solo se vea Valencia*/}
          <div className='usersScreen-section-info'   data-aos="fade-down" data-aos-easing="ease-in-out" data-aos-duration="500" >
          {user.address && <h3> <i className="fa-solid fa-location-dot"></i>  {user.address.split(",").pop().trim()}</h3>} 
          <h3> {user.specialization.join(', ')}</h3>
          {user.yearsOfExperience && (
            <>
            <h4>En el sector desde: {new Date(user.yearsOfExperience).toLocaleString('default', { year: 'numeric', month: 'long' })} con {' '}
            <span> </span>
              {calculateExperience(user.yearsOfExperience, new Date()).years} años y{' '}
              {calculateExperience(user.yearsOfExperience, new Date()).months} meses de experiencia
            </h4>
            </>
          )}
          </div>
          <div className='usersScreen-section-info' >
            <h4 data-aos="fade-left" data-aos-easing="ease-in-out" data-aos-duration="400">contactar</h4>
            <h4 data-aos="fade-left" data-aos-easing="ease-in-out" data-aos-duration="600">contactar</h4>
            <h4 data-aos="fade-left" data-aos-easing="ease-in-out" data-aos-duration="800">contactar</h4>
          </div>

        </section>
      ))}
    </div>
  );
}

export default UsersScreen;

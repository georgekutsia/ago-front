import React, { useContext, useEffect, useState } from 'react';
import { getUsers } from '../../shared/services/api';
import { Link, NavLink } from 'react-router-dom';
import { LoggedContext } from '../../shared/contexts/JwtContext';

function UsersScreen() {
  const { userData, setUserData } = useContext(LoggedContext);
  const [usersData, setUsersData] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");

  const emptySpec = ""
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsersData(data);
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

  const handleSpecializationFilterChange = (e) => {
    setSpecializationFilter(e.target.value);
  };

  const filteredUsers = usersData.filter((user) => {
    const nameMatches = user.name.toLowerCase().includes(nameFilter.toLowerCase());
    const experienceMatches = user.yearsOfExperience
      ? calculateExperience(user.yearsOfExperience, new Date()).years >= Number(experienceFilter)
      : true;
    const specializationMatches =
      specializationFilter === "" || user.specialization.some(spec => spec.name === specializationFilter);
    return nameMatches && experienceMatches && specializationMatches;
  });

  return (
    <div className='usersScreen'>
      <div className='d-flex'>
        <input type="text" placeholder="Filtrar por nombre" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
        <input type="number" placeholder="Filtrar por años de experiencia" value={experienceFilter} onChange={(e) => setExperienceFilter(e.target.value)} />
      <div>
      </div>
        <label htmlFor="specializationFilter">Filtrar por especialización:</label>
        <select id="specializationFilter" value={specializationFilter} onChange={handleSpecializationFilterChange}>
          <option value={emptySpec}>Todos</option>
          {filteredUsers.map((user)=>user?.specialization?.map((spec,index) =>
          <option key={index} value={spec.name}>{spec.name}</option>
          ))}
        </select>
      </div>

      {filteredUsers.map((user, index) => (
        <section className='usersScreen-section' key={index} data-aos="fade-right" >
          <div className='usersScreen-section-divImg' >
            <img src={user.img} alt={user.name} />
            <h4>{user.name}</h4>
          </div>
          {/* es feo que se vea la dirección completa, pero sí al menos la ciudad, así que esto apaña que de  Calle del Sol, 78, Valencia solo se vea Valencia*/}
          <div className='usersScreen-section-divInfo' data-aos="fade-down" data-aos-easing="ease-in-out" data-aos-duration="500" >
            {user.address && <h3> <i className="fa-solid fa-location-dot"></i>  {user.address.split(",").pop().trim()}</h3>}
            <h3> {user.specialization?.map((spec, index) => (
              <div key={index} className='d-flex'>
                <img src={spec.img} alt={spec.name} width={30} />
                <h5>{spec.name}</h5>
              </div>
            ))}</h3>
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
            <Link to={`/form/${userData?._id}/${user._id}`} data-aos="fade-left" data-aos-easing="ease-in-out" data-aos-duration="400" >Hacer petición</Link>
          </div>
        </section>
      ))}
    </div>
  );
}

export default UsersScreen;

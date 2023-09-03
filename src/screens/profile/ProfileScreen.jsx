import React, { useContext, useState } from 'react'
import { LoggedContext } from '../../shared/contexts/JwtContext';
import { ButtonComponentEdit, MapView, UserUpdateForm } from '../../components';



function ProfileScreen() {
  const { userData, setUserData } = useContext(LoggedContext);
  const [update, setUpdate] = useState ()
  
  return (
    <div className="profile">
      <MapView setLatitude={userData?.map?.x} setLenght={userData?.map?.y}/>
      <section >
        <p>{userData?.name}</p>
        <img src={userData?.img} alt="User" width={200} />
        <p>{userData?.email}</p>
        <p>{userData?.specialization}</p>
        <p>{userData?.phoneNumber}</p>
        <p>{userData?.age}</p>
      </section>
      <section>
        {!update && <ButtonComponentEdit setClicking={setUpdate} clicked={update} btnText={"Editar perfil"}/>}
        {update && <UserUpdateForm setUpdate={setUpdate}></UserUpdateForm>}
      </section>
    </div>
  );
}

export default ProfileScreen
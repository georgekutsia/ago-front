import React, { useContext } from 'react'
import { LoggedContext } from '../../shared/contexts/JwtContext';
import { UserUpdateForm } from '../../components';

function ProfileScreen() {
  const { userData, setUserData } = useContext(LoggedContext);
  
  return (
    <div className="profile">
      <p>{userData.name}</p>
      <img src={userData.img} alt="User" width={200} />
      <p>{userData.email}</p>
      <UserUpdateForm></UserUpdateForm>
    </div>
  );
}

export default ProfileScreen
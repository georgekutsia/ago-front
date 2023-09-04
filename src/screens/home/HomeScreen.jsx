import React, { useContext, useState } from 'react'
import { ButtonComponentLogRegToggle, GalleryComponent, LoginComponent, RegisterComponent } from '../../components';
import { LoggedContext } from '../../shared/contexts/JwtContext';

function HomeScreen() {
  const [logReg, setLogReg] = useState(false)
  const { userData, setUserData } = useContext(LoggedContext);
  const { setHidden } = useContext(LoggedContext);

  setHidden(false);

  const handleToggle = ()=>{
    setLogReg(!logReg)
  }
  return (
    <div>
    {/* <GalleryComponent></GalleryComponent> */}
      {!userData && (
        <>
          {logReg && <RegisterComponent setLogReg={setLogReg} />}
          {!logReg && <LoginComponent />}
          <ButtonComponentLogRegToggle toggle={handleToggle} logReg={logReg} />
        </>
      )}
    </div>
  );
}

export default HomeScreen
import React, { useContext, useState } from 'react'
import { ButtonComponentLogRegToggle, LoginComponent, RegisterComponent } from '../../components';
import { LoggedContext } from '../../shared/contexts/JwtContext';

function HomeScreen() {
  const [logReg, setLogReg] = useState(true)
  const { userData, setUserData } = useContext(LoggedContext);

  const handleToggle = ()=>{
    setLogReg(!logReg)
  }
  return (
    <div>
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
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneUser, putConfirmUser, putUser } from '../../shared/services/api';
import { Button } from 'primereact/button';
import { Controller, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';

function Confirm() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const { control, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    getOneUser(id)
      .then((userInfo) => {
        setUserData(userInfo);
        console.log(userData);
      })
      .catch((error) => {
        console.error("Error al obtener información del usuario:", error);
      });
  }, [id]);
  const onSubmit = async () => {
    try {
      const updatedData = { ...userData, confirmed: true };

      const response = await putConfirmUser(userData._id, updatedData);
      console.log("Respuesta de actualización:", response);
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <section className="updateUser">
      <form className="registerForm formDemoUpdateUser" onSubmit={handleSubmit(onSubmit)}>
        <h3>{userData?.name}</h3>
        <div className="p-field">
          <Button type="submit" label="Confirmar" />
        </div>
      </form>
    </section>
  );
}

export default Confirm;

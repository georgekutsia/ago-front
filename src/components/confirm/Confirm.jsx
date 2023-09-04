import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getOneUser, putConfirmUser, putUser } from '../../shared/services/api';
import { Button } from 'primereact/button';
import { Controller, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';

function Confirm() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [confirming, setConfirming] = useState(true);
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
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
  const onSubmit = async (data) => {
    try {
      const updatedData = { ...userData, confirmed: true, confirmation: data.confirmation };
    const response = await putConfirmUser(userData._id, updatedData);
      setConfirming(false)
      setTimeout(() => {
        navigate('/');
      }, 1000);
      console.log("Respuesta de actualización:", response);
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <section className="confirming">
    {confirming ? (
      <form  onSubmit={handleSubmit(onSubmit)}>
        <div className="p-field">
          <Button  type="submit" label="Confirmar"  />
        </div>
      </form>
    ):(
      <>
          <div className="mainLoader"></div>
          <div className="mainLoader2"></div>
        </>
    )
    }
    </section>
  );
}

export default Confirm;

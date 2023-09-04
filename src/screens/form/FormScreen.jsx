import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate, useParams } from 'react-router-dom';
import { postForm } from "../../shared/services/formApi";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { Mention } from 'primereact/mention';
import { Checkbox } from "primereact/checkbox";



export default function FormScreen({ setUpdate }) {
  const navigation = useNavigate();
  const [userData, setUserData] = useState({});
  const { id, worker } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  const [hours, setHours] = useState([]);

  const onHoursChange = (e) => {
    const selectedHour = e.value;
    if (e.checked) {
      setHours((prevHours) => [...prevHours, selectedHour]);
    } else {
      setHours((prevHours) => prevHours.filter((hour) => hour !== selectedHour));
    }
  };


  useEffect(() => {
    const userDataFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    setUserData(userDataFromLocalStorage);
  }, []);

  const { control, handleSubmit, formState: { errors } } = useForm();

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const onSubmit = async (data) => {
    try {
      data.hours = hours;
      data.confirmed = false;
      data.closed = false;
      const response = await postForm(id, worker, data); 
      console.log("Respuesta de registro:", response);
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    <section className="formPetition">
      <form className="registerForm formDemoUpdateUser" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-content-center">
          <div className="card">
            <h3 className="text-center">Actualiza tus datos</h3>
            <div className="p-fluid">
            {/* text */}
            {/* text */}
              <div className="field">
                <span className="p-float-label">
                  <Controller name="note" control={control} rules={{
                    required: "Cual es tu petición...",
                    maxLength: { value: 340, message: "Intenta comunicar tus necesidades de formas más escueta. Luego tendréis tiempo para hablar" },
                    minLength: { value: 3, message: "El nombre debe tener más de 3 caracteres" },
                  }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} autoFocus className={classNames({ "p-invalid": fieldState.invalid })} />
                    )}/>
                  <label htmlFor="note" className={classNames({ "p-error": errors.name })}></label>
                </span>
                {getFormErrorMessage("note")}
              </div>
            {/* text */}
            {/* text */}
            {/* calendar */}
            {/* calendar */}
            <div className="field">
                <span className="p-float-label">
                  <Controller name="day" control={control}  render={({ field, fieldState }) => (
                      <Calendar id={field.name} {...field}  className={classNames({   "p-invalid": fieldState.invalid, })}/>)}/>
                  <label htmlFor="day" className={classNames({ "p-error": errors.name })}>
                  Elige qué día
                  </label>
                </span>
                {getFormErrorMessage("day")}
              </div>
            {/* calendar */}
            {/* calendar */}
            {/* hours */}
            {/* hours */}
            <div className="checker-form">
              <div className="flex align-items-center">
                <Checkbox inputId="ingredient1" name="hours" value="Mañana-" onChange={onHoursChange} checked={hours.includes("Mañana-")}/>
                <label htmlFor="ingredient1" className="ml-2"> De 9:00 a 12:00
                </label>
              </div>
              <div className="flex align-items-center">
                <Checkbox inputId="ingredient2" name="hours" value="Mediodia-" onChange={onHoursChange} checked={hours.includes("Mediodia-")}
                />
                <label htmlFor="ingredient2" className="ml-2"> De 12:00 a 16:00
                </label>
              </div>
              <div className="flex align-items-center">
                <Checkbox inputId="ingredient3" name="hours" value="Tarde-" onChange={onHoursChange} checked={hours.includes("Tarde-")}
                />
                <label htmlFor="ingredient3" className="ml-2"> 16:00 a 20:00
                </label>
              </div>
            </div>
            <div className="field">
                <span className="p-float-label">
                  <Controller name="direction" control={control} rules={{
                    required: "Dirección",
                    maxLength: { value: 340, message: "Intenta comunicar tus necesidades de formas más escueta. Luego tendréis tiempo para hablar" },
                    minLength: { value: 3, message: "El nombre debe tener más de 3 caracteres" },
                  }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} autoFocus className={classNames({ "p-invalid": fieldState.invalid })} />
                    )}/>
                  <label htmlFor="direction" className={classNames({ "p-error": errors.name })}>Dirección</label>
                </span>
                {getFormErrorMessage("direction")}
              </div>
              <Button type="submit" label="Actualizar" className="mt-2" />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

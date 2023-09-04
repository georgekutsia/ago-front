import { userLogin } from "../../shared/services/api";
import { useNavigate } from "react-router";
import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { LoggedContext } from "../../shared/contexts/JwtContext";

export default function LoginComponent() {
  const navigation = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const { control, handleSubmit, formState: { errors },} = useForm();
  const {userData, setUserData, setJwtData } = useContext(LoggedContext);
  const { setHidden } = useContext(LoggedContext);

  const onSubmit = async (data) => {
    try {
      setFormData(data);
      setShowMessage(true);
      const response = await userLogin(data);
      const userId = JSON.parse(localStorage.getItem("user"));
      setUserData(userId);
      setJwtData(localStorage.getItem("token"));
      // navigation("/");
      setHidden(true)
      navigation(`/profile/${userId._id}`);
      console.log("Respuesta de logeo:", response);
    } catch (error) {
      console.error("Hubo un error al conectarse:", error);
    }
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <section className="login">
      <form className="registerForm formDemoLog" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-content-center">
          <div className="card">
            <h3 className="text-center">Logarse</h3>
            <div className="p-fluid">
              <div className="field">
                <span className="p-float-label p-input-icon-right">
                  <i className="pi pi-envelope" />
                  <Controller name="email" control={control} rules={{
                      required: "Email is required.",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message:
                          "El email es inválido. Prueba algo como: example@email.com",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className={classNames({   "p-invalid": fieldState.invalid,})}/>
                    )}
                  />
                  <label htmlFor="email" className={classNames({ "p-error": !!errors.email })}> Email* </label>
                </span>
                {getFormErrorMessage("email")}
              </div>
              <div className="field">
                <span className="p-float-label">
                  <Controller name="password" control={control} rules={{ required: "Password is required." }} render={({ field, fieldState }) => (
                      <Password id={field.name} {...field} toggleMask className={classNames({ "p-invalid": fieldState.invalid, })}/>
                    )}
                  />
                  <label htmlFor="password" className={classNames({ "p-error": errors.password })} > Contraseña* </label>
                </span>
                {getFormErrorMessage("password")}
              </div>
              <Button type="submit" label="Entrar" className="mt-2" />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

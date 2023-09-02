import { userRegister } from "../../shared/services/api";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { getError, clearError } from "../../shared/services/errorHandler";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";

export default function RegisterComponent({ setLogReg }) {
  const navigation = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)}/>
    </div>
  );
  const passwordHeader = <h6>Elige una contraseña</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>Al menos una minúscula</li>
        <li>Al menos una mayúscula</li>
        <li>Al menos un número</li>
        <li>Al menos un caracter especial</li>
        <li>De 6 a 16 caracteres</li>
      </ul>
    </React.Fragment>
  );

  const onSubmit = async (data) => {
    const error = getError();
    try {
      setFormData(data);
      const response = await userRegister(data);
          if (error) {
            console.log("eeee", error);
            setErrorMessage("Buena esa");
            clearError();
          } else {
            console.log("eeee elese", error);
            setErrorMessage("El email ya está registrado. Elige otro");
            clearError();
          }
        setShowMessage(true);
          // setLogReg(false);
      console.log("Respuesta de registro:", response);
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    <section className="register">
      <form className="registerForm formDemo" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-content-center">
          <div className="card">
            <h3 className="text-center">Registrarse</h3>
            <div className="p-fluid">
              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="name"
                    control={control}
                    rules={{
                      required: "Nombre es requerido.",
                      maxLength: {
                        value: 30,
                        message:
                          "Intenta crear un nombre más corto (máximo 30 caracteres).",
                      },
                      minLength: {
                        value: 3,
                        message: "El nombre debe tener más de 3 caracteres",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="name"
                    className={classNames({ "p-error": errors.name })}
                  >
                    Nombre*
                  </label>
                </span>
                {getFormErrorMessage("name")}
              </div>
              <div className="field">
                <span className="p-float-label p-input-icon-right">
                  <i className="pi pi-envelope" />
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required.",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message:
                          "El email es inválido. Prueba algo como: example@email.com",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  {errorMessage && !showMessage && (
                    <h5 style={{ color: "red" }}> {errorMessage}</h5>
                  )}
                  <label
                    htmlFor="email"
                    className={classNames({ "p-error": !!errors.email })}
                  >
                    Email*
                  </label>
                </span>
                {getFormErrorMessage("email")}
              </div>
              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required.",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                        message:
                          "Mayúscula, minúscula, número, caracter especial y de 6 a 16 caracteres",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <Password
                        id={field.name}
                        {...field}
                        toggleMask
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        header={passwordHeader}
                        footer={passwordFooter}
                      />
                    )}
                  />
                  <label
                    htmlFor="password"
                    className={classNames({ "p-error": errors.password })}
                  >
                    Contraseña*
                  </label>
                </span>
                {getFormErrorMessage("password")}
              </div>
              <div className="field-checkbox">
              <h6 style={{color:"lightblue"}}>*Cualquier usuario que difunda información calumniosa sobre otros usuarios o empresas, será baneado de nuestra plataforma hasta que se resuelva el conflicto. Si aceptas estas condiciones te haces responsable de cualquier disputa legal que surja de las mismas</h6>
                <Controller
                  name="accept"
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    
                    <Checkbox
                      inputId={field.name}
                      onChange={(e) => field.onChange(e.checked)}
                      checked={field.value}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label htmlFor="accept" className={classNames({ "p-error": errors.accept })} > Acepto los términos y condiciones*</label>
              </div>
              <Button type="submit" label="Submit" className="mt-2" />
            </div>
          </div>
        </div>
      </form>
      <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ "960px": "80vw" }} style={{ width: "30vw" }}
      >
        <div className="flex justify-content-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Te has registrado correctamente!</h5>
        </div>
      </Dialog>
    </section>
  );
}

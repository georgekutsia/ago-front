import { putUser, getOneUser } from "../../../shared/services/api";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
        import { InputNumber } from "primereact/inputnumber";


export default function UserUpdateForm({ setUpdate }) {
  const navigation = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
const [value, setValue] = useState("");
const [typeSpecialization, setTypetypeSpecialization] = useState(null);

const handleTypeChange = (e) => {
  const selectedValues = e.value;
  if (selectedValues.length <= 3) {
    setTypetypeSpecialization(selectedValues);
  } else {
    setTypetypeSpecialization(selectedValues.slice(0, 3));
  }
};
        
  useEffect(() => {
    const userDataFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    getOneUser(userDataFromLocalStorage._id)
      .then((userInfo) => {
        setUserData(userInfo);
      })
      .catch((error) => {
        console.error("Error al obtener información del usuario:", error);
      });
  }, []);

  const { control, handleSubmit, formState: { errors }, } = useForm();

  const specializations = [
    { label: "Albañil", value: "Albañil" },
    { label: "Carpintero", value: "Carpintero" },
    { label: "Electricista", value: "Electricista" },
    { label: "Fontanero ", value: "Fontanero" },
    { label: "Pintor", value: "Pintor" },
    { label: "Jardinero", value: "Jardinero" },
    { label: "Yesero", value: "Yesero" },
    { label: "Techador", value: "Techador" },
    { label: "Hormigonero", value: "Hormigonero" },
  ];
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };
  const passwordHeader = <h6>Elige una contraseña segura</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>Al menos una minúscula</li>
        <li>Al menos una mayúscula</li>
        <li>Al menos un número</li>
        <li>Mínimo 8 caracteres</li>
      </ul>
    </React.Fragment>
  );

  const onSubmit = async (data) => {
    data.specialization = typeSpecialization;

    try {
      setFormData(data);
      setShowMessage(true);
      const response = await putUser(userData._id, data);
        setUpdate(false);

      console.log("Respuesta de registro:", response);
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };
  return (
    <section className="updateUser">
      <form className="registerForm formDemoUpdateUser" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-content-center">
          <div className="card">
            <h3 className="text-center">Actualiza tus datos</h3>
            <div className="p-fluid">
            {/* name */}
            {/* name */}
              <div className="field">
                <span className="p-float-label">
                  <Controller name="name" control={control} rules={{ required: "Nombre es requerido.", maxLength: { value: 30, message:   "Intenta crear un nombre más corto (máximo 30 caracteres).",}, 
                  minLength: { value: 3, message: "El nombre debe tener más de 3 caracteres",},}}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} value={userData?.name} {...field} autoFocus className={classNames({"p-invalid": fieldState.invalid,})} />
                    )}
                  />
                  <label htmlFor="name" className={classNames({ "p-error": errors.name })}>
                   Aes {userData?.name}
                  </label>
                </span>
                {getFormErrorMessage("name")}
              </div>
              {/* /name */}
              {/* /name */}
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
                      <InputText id={field.name} {...field} className={classNames({   "p-invalid": fieldState.invalid, })}/>
                    )}
                  />
                  <label
                    htmlFor="email"
                    className={classNames({ "p-error": !!errors.email })}
                  >
                    Modificar el Email*
                  </label>
                </span>
                {getFormErrorMessage("email")}
              </div>
              <div className="field">
                <span className="p-float-label">
                  <Controller name="password" control={control} rules={{ required: "Password is required." }} render={({ field, fieldState }) => (
                      <Password id={field.name} {...field} toggleMask className={classNames({
                          "p-invalid": fieldState.invalid,
                        })} header={passwordHeader} footer={passwordFooter}
                      />
                    )}
                  />
                  <label htmlFor="password" className={classNames({ "p-error": errors.password })}>
                    Modificar la Contraseña*
                  </label>
                </span>
                {getFormErrorMessage("password")}
              </div>

<div className="double-input">

{/* Age */}
{/* Age */}
              <div className="field">
                <span className="p-float-label">
                  <Controller name="age" control={control} rules={{
                      required: "Nombre es requerido.",
                      max: { value: 130, message:   "Admiramos que siga vivo a esta edad, pero nos preocupa su salud. Descanse",},
                      nim: { value: 12, message: "Debe tener más de 12 años para usar nuestros servicios",},
                    }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} value={userData?.age} {...field}  className={classNames({"p-invalid": fieldState.invalid,})}
                      />
                    )}
                  />
                  <label htmlFor="age" className={classNames({ "p-error": errors.name })}>
                    Edad {userData?.age}
                  </label>
                </span>
                {getFormErrorMessage("age")}
              </div>
{/* Age */}
{/* Age */}



{/* Phone Number */}
{/* Phone Number */}
              <div className="field">
                <span className="p-float-label">
                  <Controller name="phoneNumber" control={control} rules={{   
                      max: { value: 30, message:   "Máximo números de teléfono de 30 digitos",},
                      min: { value: 3, message: "Faltan datos en el número",},
                      }}
                    render={({ field, fieldState }) => (
                      <InputMask id={field.name} {...field}  mask="+99-999-999-999" placeholder="+99-999999"  className={classNames({ "p-invalid": fieldState.invalid,})}/>)}/>
                  <label htmlFor="phoneNumber" className={classNames({ "p-error": errors.name })}>
                   Teléfono {userData?.phoneNumber}
                  </label>
                </span>
                {getFormErrorMessage("phoneNumber")}
              </div>
{/* Phone Number */}
{/* Phone Number */}
</div>


{/* typeSpecialization */}
{/* typeSpecialization */}
                <div className="field">
                  <span className="p-float-label">
                    <MultiSelect id="typeCompany" name="typeSpecialization" value={typeSpecialization} options={specializations} onChange={handleTypeChange} display="chip"
                    placeholder="Selecciona tipo de empresas que vas a crear. Máximo 3." optionLabel="label" optionValue="value" maxSelectedLabels={3} className="w-full md:w-20rem"/>
                    <label htmlFor="typeCompany">Destaca 3 especialidades</label>
                  </span>
                </div>
{/* typeSpecialization */}
{/* typeSpecialization */}

{/* yearsOfExperience */}
{/* yearsOfExperience */}
              <div className="field">
                <span className="p-float-label">
                  <Controller name="yearsOfExperience" control={control}  render={({ field, fieldState }) => (
                      <Calendar id={field.name} {...field}  className={classNames({   "p-invalid": fieldState.invalid, })}/>)}
                  />
                  <label htmlFor="yearsOfExperience" className={classNames({ "p-error": errors.name })}
                  >
                   Experiencia desde  {userData?.yearsOfExperience}
                  </label>
                </span>
                {getFormErrorMessage("yearsOfExperience")}
              </div>
{/* yearsOfExperience */}
{/* yearsOfExperience */}


              <Button type="submit" label="Actualizar" className="mt-2" />
            </div>
          </div>
        </div>
      </form>

    </section>
  );
}

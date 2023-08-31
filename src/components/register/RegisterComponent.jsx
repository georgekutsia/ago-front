import React from "react";
import { useForm } from "react-hook-form";
import { userRegister } from "../../shared/services/api";
import { useNavigate } from "react-router";
import { Password } from "primereact/password";

export default function RegisterComponent() {
  const { register, handleSubmit } = useForm();
  const navigation = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const response = await userRegister(formData);
      navigation("/login");
      console.log("Respuesta de registro:", response);
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
      <label className="registerForm-label"  htmlFor="name">Nombre</label>
      <input className="registerForm-input" id="name" placeholder="Nombre.."
        {...register("name", { required: true })}
      />
      <label className="registerForm-label"  htmlFor="email">Email</label>
      <input className="registerForm-input" id="email" placeholder="Email..."
        {...register("email", {
          required: true,
          // pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        })}
      />
      <label className="registerForm-label"  htmlFor="password">Contraseña</label>
      <input className="registerForm-input" name="password" id="password" type="password" placeholder="Contraseña..."
        {...register("password", {
          required: true,
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        })}
      />
      <input className="registerForm-button" type="submit" value="Register" />
      {/* <Password className="p-invalid" /> */}
    </form>
  );
}

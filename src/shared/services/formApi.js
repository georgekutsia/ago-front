import axios from 'axios';

import { setError } from "./errorHandler";

const http = axios.create({baseURL:"http://localhost:5003", withCredentials:true})



// export async function userRegister(data) {
//   try {
//     console.log("registrando", data);
//     await http.post("/user/register", data);
//   } catch (error) {
//     console.log("errorsssss ", error.response.data.message)
//     setError(error.response.data.message);
//   }
// }

// export async function userLogin(data) {
//     console.log("logando", data);
//     const res = await http.post("/user/login", data);
//   localStorage.setItem("token", res.data.token);
//   localStorage.setItem("user", JSON.stringify(res.data.user));
// }

//   export function logout() {
//     localStorage.removeItem('user');
//     return localStorage.removeItem('token');
//   }


export async function getCompanies() {
  const response = await http.get(`/company`);
  return response.data;
}

export async function putUser(id, data) {
  console.log("actualizada la información de usuario", data);
  await http.put(`/user/${id}`, data);
}

export async function getOneUser(id) {
  console.log("Recibida información de usuario");
  const response = await http.get(`/user/${id}`);
  return response.data;
}



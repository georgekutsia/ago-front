import axios from 'axios';

import { setError } from "./errorHandler";

const http = axios.create({baseURL:"http://localhost:5003", withCredentials:true})



export async function userRegister(data) {
  try {
    await http.post("/user/register", data);
  } catch (error) {
    setError(error.response.data.message);
  }
}

export async function userLogin(data) {
    const res = await http.post("/user/login", data);
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));
}

  export function logout() {
    localStorage.removeItem('user');
    return localStorage.removeItem('token');
  }

export async function putUser(id, data) {
  console.log("actualizada la información de usuario", data);
  await http.put(`/user/${id}`, data);
}
export async function putConfirmUser(id, data) {
  console.log("actualizada la información de usuario", data);
  await http.put(`/user/${id}/confirm`, data);
}

export async function getOneUser(id) {
  console.log("Recibida información de usuario");
  const response = await http.get(`/user/${id}`);
  return response.data;
}


export async function getUsers() {
  console.log("Recibida información de todos los usuarios");
  const response = await http.get(`/user`);
  return response.data;
}



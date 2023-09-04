import axios from 'axios';

import { setError } from "./errorHandler";

const http = axios.create({baseURL:"http://localhost:5003", withCredentials:true})


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



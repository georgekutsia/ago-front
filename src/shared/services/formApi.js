import axios from 'axios';


const http = axios.create({baseURL:"http://localhost:5003", withCredentials:true})


export async function getForm() {
  const response = await http.get(`/form`);
  return response.data;
}

export async function postForm(id, worker, data) {
  console.log("actualizada la información de usuario", data);
  await http.post(`/form/${id}/${worker}`, data);
}

export async function getOneForm(id) {
  console.log("Recibida información de usuario");
  const response = await http.get(`/user/${id}`);
  return response.data;
}



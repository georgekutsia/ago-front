import axios from 'axios';

const http = axios.create({baseURL:"http://localhost:5003", withCredentials:true})


export function userRegister(data) {
  console.log("registrando", data);
  return http.post("/user/register", data);
}



export async function userLogin(data) {
    console.log("logando", data);
    const res = await http.post("/user/login", data);
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));
}

  export function logout() {
    localStorage.removeItem('user');
   return localStorage.removeItem('token');
  }


export function putUser(id, data) {
  console.log("actualizada la información de usuario", data);
  return http.put(`/user/${id}`, data);
}
export function getOneUser(id) {
  console.log("Recibida información de usuario");
  return http.get(`/user/${id}`);
}

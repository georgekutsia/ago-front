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










  // getRestaurants(){
  //   return this.http.get(this.url)
  // }

  // getRestaurantById(id: string){
  //   return this.http.get(`${this.url}/${id}`)
  // }

  // postRestaurant(restaurant: RestaurantI){
  //   return this.http.post(this.url, restaurant)
  // }

  // putRestaurant(restaurant: RestaurantI, id: string){
  //   return this.http.put(`${this.url}/${id}`, restaurant)
  // }

  // deleteRestaurants(id: string){
  //   return this.http.delete(`${this.url}/${id}`)
  // }

  // setRestaurant(restaurant: RestaurantI, id: string){
  //   this.restaurant = {...restaurant};
  //   this.id = id
  // }

  // getRestaurant(){
  //   return this.restaurant;
  // }

  // getId(){
  //   return this.id;
  // }

  // getUserById(id: string) {
  //   return this.http.get(`${this.db_url}/usuarios/${id}`)
  // }
  // updateUsuarios(id: string, data: any) {
  //   return this.http.put(`${this.db_url}/usuarios/${id}`, data);
  // }




// export const APIHeaders = {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*',
//     'Authorization': {
//         toString () {
//             return `Bearer ${localStorage.getItem('token')}`
//         }
//     }
// };

// export const API = axios.create({
//     baseURL: process.env.REACT_APP_BACK_URL,
//     timeout: 6000,
//     headers: APIHeaders
// });

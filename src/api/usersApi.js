import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});


export const createUser = async (userData) => {
  const response = await api.post("/users", userData);
  
  return response.data;
};

export const loginUser = async (credentials) => {  
  console.log(api, "api");
  
  const response = await api.post("/users/login", credentials);
  console.log(response, "response");
  
  return response.data;
};

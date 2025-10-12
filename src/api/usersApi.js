import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});


export const createUser = async (userData) => {
  const response = await api.post("/users", userData);
  
  return response.data;
};
export const getUserProfile = async (userId, token) => {
  const response = await api.get(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const loginUser = async (credentials) => {  
  console.log(api, "api");
  
  const response = await api.post("/users/login", credentials);
  console.log(response, "response");
  
  return response.data;
};
export const updateUser = async (userId, userData, token) => {
  const response = await api.put(`/users/${userId}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  }); 
  return response.data;}

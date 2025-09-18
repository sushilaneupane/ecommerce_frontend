import axios from "axios";


const api = axios.create({
  baseURL: "https://ecommerce-backend-sivx.onrender.com/api",
});


export const createUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/users/login", credentials);
  return response.data;
};

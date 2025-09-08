import axios from "axios";


const api = axios.create({
  baseURL: " http://localhost:3001/api",
});


export const createUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/users/login", credentials);
  return response.data;
};

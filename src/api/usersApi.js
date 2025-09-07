import axios from "axios";

// ✅ Base API instance
const api = axios.create({
  baseURL: " http://localhost:3001/api",
});

// ✅ Create User
export const createUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

// ✅ Login User
export const loginUser = async (credentials) => {
  const response = await api.post("/users/login", credentials);
  return response.data;
};

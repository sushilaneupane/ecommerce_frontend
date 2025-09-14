// src/api/cartApi.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});
export const createCart = async (cartData, token) => {
  console.log(cartData, token);
  const response = await api.post(`/carts`, cartData, {

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getCartsByUserId = async (userId, token) => {
  const response = await api.get(`/carts/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};




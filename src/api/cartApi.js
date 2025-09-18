
import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-backend-sivx.onrender.com/api",
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

export const deleteCart = async (id, token) => {
  const response =await api.delete(`/carts/${id}`,
     { headers: {
       Authorization: `Bearer ${token}` } });

  return response.data;
};

export const updateCart = async (id, quantity, userId, productId) => {
  const response = await api.patch(`/carts/${id}`, 
    cartData, {

    headers: {
       Authorization: `Bearer ${token}` },
  });
  return response.data;
};


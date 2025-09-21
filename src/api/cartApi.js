
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
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
export const updateCart = async (id, cartData, token) => {
  try {
    console.log("Sending update request:", { id, ...cartData });

    const response = await api.patch(`/carts/${id}`, cartData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating cart:", error.response?.data || error.message);
    throw error;
  }
};



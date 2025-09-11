import axios from "axios";

const API_URL = "http://localhost:3001/api/carts";

/** Get carts by userId */
export const getCartsByUserId = async (userId, token) => {
  const { data } = await axios.get(`${API_URL}/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

/** Update cart item */
export const updateCart = async (cartItemId, updatedItem, token) => {
  const { data } = await axios.put(`${API_URL}/${cartItemId}`, updatedItem, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

/** Delete cart item */
export const deleteCart = async (cartId, token) => {
  const { data } = await axios.delete(`${API_URL}/${cartId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

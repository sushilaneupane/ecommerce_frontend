import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});
export const getOrders = async (userId, token) => {
  try {
    const response = await api.get(`/orders/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw error;
  }
};
export const getAllOrders = async (token) => {
  try {
    const response = await api.get(`/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error.message);
    throw error;
  }
};

export const createOrder = async (orderData, token) => {
  const response = await api.post("/orders", orderData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
export const updateOrderApi = async (orderId, updateData, token) => {
  try {
    const response = await api.put(`/orders/${orderId}`, updateData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error.message);
    throw error;
  }
};

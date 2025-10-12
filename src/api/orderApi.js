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

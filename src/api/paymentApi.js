import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});
export const getAllPayments = async (token) => {
  try {
    const response = await api.get(`/payments`, {
      headers: { Authorization: `Bearer ${token}` },
    });console.log(response);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching all payments:", error.message);
    throw error;
  }
};

export const updatePayment = async (paymentId, updateData, token) => {
  try {
    const response = await api.put(`/payments/${paymentId}`, updateData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating payment:", error.message);
    throw error;
  }
};


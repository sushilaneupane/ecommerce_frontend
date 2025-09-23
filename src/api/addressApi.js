import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

export const createCart = async (cartData, token) => {

  const response = await api.post(`/carts`, cartData, {

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createAddress = async (data, token) => {
  try {    
    const response = await api.post("/address", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating address:", error.message);
    throw error.response.data;
  }
};

export const getAddressByUserId = async (userId, token) => {
  try {
    const response = await api.get(`/address/user/${userId}`, {
         headers: {
        Authorization: `Bearer ${token}`,
      }});
    return response.data;
  } catch (error) {
    console.error("Error fetching address:", error.message);
    throw new Error("Failed to fetch address. Please try again later.");
  }
};

  export const updateAddress= async (id, data, token) => {
    try {    
      console.log(data, "cscbjsckjcl");
      const response = await api.put(`/address/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating address:", error.message);
      throw error.response.data;
    }
  };
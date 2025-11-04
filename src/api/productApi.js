import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

export const fetchProducts = async () => {
  try {
    const response = await api.get(`/products`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchProductById = async (id, userId = null) => {
  try {
    const url = userId ? `/products/${id}?userId=${userId}` : `/products/${id}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching product with id ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};


export const createProduct = async (formData, token) => {
  return axios.post(`${import.meta.env.VITE_BASEURL}/products`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = async (productId, productData, token) => {
  try {
    const response = await api.put(`/products/${productId}`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response?.data || error.message);
    throw error;
  }
};


export const deleteProduct = async (productId, token) => {
  console.log("Deleting product with ID:", productId);
  try {
    const response = await api.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error.response?.data || error.message);
    throw error;
  }
};
export const getTotalLengthProducts = async () => {
  try {
    const response = await api.get(`/products/total`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching total length of products:",
      error.response?.data || error.message
    );
    throw error;
  }
};

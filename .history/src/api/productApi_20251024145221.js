import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

export const fetchProducts = async () => {
  try {
    const response = await api.get(`/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
export const createProduct = async (product, token) => {
  const formData = new FormData();
  formData.append("name", product.productName);
  formData.append("categoryName", product.categoryName);
  formData.append("price", product.price);
  formData.append("description", product.description);

  product.files?.forEach((file) => {
    formData.append("files", file);
  });

  return axios.post(API_URL, formData, {
    headers: { Authorization: `Bearer ${token}` },
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
}
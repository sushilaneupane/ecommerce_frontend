import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

export const fetchCategories = async () => {
  try {
    const response = await api.get(`/categories`);
    console.log(response.data, "data");
    
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error.response?.data || error.message);
    throw error;
  }
};

export const createCategory = async (categoryData, token) => {
  try {
    const response = await api.post("/categories",categoryData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error.response?.data || error.message);
    throw error;
  }
};
export const updateCategory = async (categoryId, categoryData, token) => {
  try {
    const response = await api.put(`/categories/${categoryId}`, categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteCategory = async (categoryId, token) => {
  try {
    const response = await api.delete(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error.response?.data || error.message);
    throw error;
  }
};
export const fetchCategories = async () => {
  const response = await fetch("https://ecommerce-backend-sivx.onrender.com/api/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};


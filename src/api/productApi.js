
export const fetchProducts = async () => {
  const response = await fetch("https://ecommerce-backend-sivx.onrender.com/api/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
export const fetchProductById = async (id) => {
  const response = await fetch(`https://ecommerce-backend-sivx.onrender.com/api/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
};

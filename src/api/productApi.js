
export const fetchProducts = async () => {
  const response = await fetch("http://localhost:3001/api/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
export const fetchProductById = async (id) => {
  const response = await fetch(`http://localhost:3001/api/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
};

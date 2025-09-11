export const fetchCategories = async () => {
  const response = await fetch("http://localhost:3001/api/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};


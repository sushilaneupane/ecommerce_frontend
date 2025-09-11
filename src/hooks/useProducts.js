import { useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from "../api/productApi";

// Hook to fetch all products
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

// Hook to fetch a single product by ID
export const useProductById = (id) => {
  return useQuery({
    queryKey: ["product", id], // include id in query key
    queryFn: () => fetchProductById(id), // pass id to API function
    enabled: !!id, // only run query if id exists
  });
};

import { useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from "../api/productApi";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};


export const useProductById = (id) => {
  return useQuery({
    queryKey: ["product", id], 
    queryFn: () => fetchProductById(id), 
    enabled: !!id,
     
    select: (data) => ({
      ...data,
      firstImage: data.images?.[0]
        ? `http://localhost:3001/uploads/${data.images[0]}`
        : "/image/cardimage.jpg",
    }),
  });
 

};

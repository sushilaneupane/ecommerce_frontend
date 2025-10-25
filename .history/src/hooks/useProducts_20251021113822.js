import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, fetchProductById } from "../api/productApi";
import { PRODUCT_KEY } from "@/utils/queryKeys";

export function useProducts() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken");

  // Fetch all products
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: [PRODUCT_KEY],
    queryFn: () => fetchProducts(token),
    enabled: !!token,
  });

  return {
    products,
    isLoading,
    isError,
  };
}

export function useProductById(id) {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken");

  const { data: product, isLoading, isError } = useQuery({
    queryKey: [PRODUCT_KEY, id],
    queryFn: () => fetchProductById(id, token),
    enabled: !!id && !!token,
    select: (data) => ({
      ...data,
      firstImage: data.images?.[0]
        ? `http://localhost:3001/uploads/${data.images[0]}`
        : "/image/cardimage.jpg",
    }),
  });

  // (Optional) In case you add mutations later like update or delete product
  const refetchProduct = () => {
    queryClient.invalidateQueries([PRODUCT_KEY, id]);
  };

  return {
    product,
    isLoading,
    isError,
    refetchProduct,
  };
}

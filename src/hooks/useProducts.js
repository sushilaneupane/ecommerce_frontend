import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTotalLengthProducts,
} from "../api/productApi";
import { PRODUCT_KEY } from "@/utils/queryKeys";
import { toast } from "sonner";
import is from "zod/v4/locales/is.cjs";

export function useProducts() {
  const token = localStorage.getItem("authToken");
  const queryClient = useQueryClient();

  const {
    data: productsData = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: [PRODUCT_KEY],
    queryFn: fetchProducts,
  });

  const {
    data: totalProductCount = [],
    isLoading: isTotalLoading,
    isError: isTotalError,
    error: errorTotal,
  } = useQuery({
    queryKey: [PRODUCT_KEY, "total-products"],
    queryFn: () => getTotalLengthProducts(token),
    enabled: !!token,
  });

  const create = useMutation({
    mutationFn: (data) => createProduct(data, token),
    onSuccess: () => {
      toast.success("Product created successfully!");
      queryClient.invalidateQueries([PRODUCT_KEY]);
      queryClient.invalidateQueries(["totalProducts"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to create product");
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data, token),
    onSuccess: () => {
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries([PRODUCT_KEY]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update product");
    },
  });

  const remove = useMutation({
    mutationFn: (id) => deleteProduct(id, token),
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries([PRODUCT_KEY]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to delete product");
    },
  });

  

  return {
    productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    create,
    update,
    remove,
    isTotalLoading,
    isTotalError,
    refetchProducts,
    totalProductCount,
    errorTotal,
    isTotalLoading,
    isTotalError,
  };
}

export function useProductById(id) {
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user?.id ?? null;

  const { data: product, isLoading, isError } = useQuery({
    queryKey: [PRODUCT_KEY, id],
    queryFn: () => fetchProductById(id, userId),
    enabled: !!id,
    select: (data) => ({
      ...data,
      firstImage: data?.images?.[0]
        ? `http://localhost:3001/uploads/${data.images[0].image}`
        : "/image/cardimage.jpg",
    }),
  });

  return { product, isLoading, isError };
}


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
    data: totalProductsData = { totalProducts: 0 },
    isLoading: isTotalLoading,
    isError: isTotalError,
    refetch: refetchTotalProducts,
  } = useQuery({
    queryKey: ["totalProducts"],
    queryFn: getTotalLengthProducts,
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
    totalProducts: totalProductsData?.totalProducts ?? 0,
    isTotalLoading,
    isTotalError,
    refetchTotalProducts,
    refetchProducts,
  };
}

export function useProductById(id) {
  const { data: product, isLoading, isError } = useQuery({
    queryKey: [PRODUCT_KEY, id],
    queryFn: () => fetchProductById(id),
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

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";
import { PRODUCT_KEY } from "@/utils/queryKeys";
import { toast } from "sonner";

export function useProducts() {
  const token = localStorage.getItem("authToken");
  const queryClient = useQueryClient();

  // Fetch all products
  const { data: productsData = [], isLoading, isError } = useQuery({
    queryKey: [PRODUCT_KEY],
    queryFn: fetchProducts, // returns array directly
  });

  // Create product
  const create = useMutation({
    mutationFn: (newProduct) => createProduct(newProduct, token),
    onSuccess: () => {
      toast.success("Product created successfully!");
      queryClient.invalidateQueries([PRODUCT_KEY]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to create product");
    },
  });

  // Update product
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

  // Delete product
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
    isLoading,
    isError,
    create,
    update,
    remove,
  };
}

// Fetch single product by ID
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

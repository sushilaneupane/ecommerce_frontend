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

export function useProducts(productId = null) {
  const token = localStorage.getItem("authToken");
  const queryClient = useQueryClient();

  // 🔹 Fetch all products
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: [PRODUCT_KEY],
    queryFn: () => fetchProducts(token),
    enabled: !!token && !productId, // run only if not fetching single product
    select: (response) => response?.data || [],
  });

  // 🔹 Fetch a single product by ID
  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useQuery({
    queryKey: [PRODUCT_KEY, productId],
    queryFn: () => fetchProductById(productId, token),
    enabled: !!productId && !!token, // only run if id provided
    select: (data) => ({
      ...data,
      firstImage: data?.images?.[0]
        ? `http://localhost:3001/uploads/${data.images[0].image}`
        : "/image/cardimage.jpg",
    }),
  });

  // 🔹 Create Product
  const create = useMutation({
    mutationFn: (newProduct) => createProduct(newProduct, token),
    onSuccess: () => {
      toast.success("✅ Product created successfully!");
      queryClient.invalidateQueries([PRODUCT_KEY]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to create product");
    },
  });

  // 🔹 Update Product
  const update = useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data, token),
    onSuccess: () => {
      toast.success("✏️ Product updated successfully!");
      queryClient.invalidateQueries([PRODUCT_KEY]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update product");
    },
  });

  // 🔹 Delete Product
  const remove = useMutation({
    mutationFn: (id) => deleteProduct(id, token),
    onSuccess: () => {
      toast.success("🗑️ Product deleted successfully!");
      queryClient.invalidateQueries([PRODUCT_KEY]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to delete product");
    },
  });

  return {
    // list
    products,
    isProductsLoading,
    isProductsError,
    // single
    product,
    isProductLoading,
    isProductError,
    // actions
    create,
    update,
    remove,
  };
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "../api/categoryApi"; 
import { CATEGORY_KEY } from "@/utils/queryKeys";

export function useCategories() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken");

  // Fetch categories
  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: [CATEGORY_KEY],
    queryFn: () => fetchCategories(token),
    enabled: !!token,
  });

  // Create category
  const create = useMutation({
    mutationFn: (categoryData) => createCategory(categoryData, token),
    onSuccess: () => {
      queryClient.invalidateQueries([CATEGORY_KEY]);
    },
    onError: (error) => {
      console.error(error?.response?.data?.message || "Failed to create category");
    },
  });

  
  return {
    categories,
    isLoading,
    isError,
    create,
    
  };
}

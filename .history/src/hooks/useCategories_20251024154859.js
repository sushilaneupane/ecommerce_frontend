import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategories, createCategory, updateCategory, deleteCategory} from "../api/categoryApi"; 
import { CATEGORY_KEY } from "@/utils/queryKeys";

export function useCategories() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken");

  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: [CATEGORY_KEY],
    queryFn: () => fetchCategories(token),
    enabled: !!token,
  });

  const create = useMutation({
    mutationFn: (categoryData) => createCategory(categoryData, token),
    onSuccess: () => {
      queryClient.invalidateQueries([CATEGORY_KEY]);
    },
    onError: (error) => {
      console.error(error?.response?.data?.message || "Failed to create category");
    },
  });

  const update = useMutation({
    mutationFn: ({ categoryId, categoryData }) => updateCategory(categoryId, categoryData, token),
    onSuccess: () => {
      queryClient.invalidateQueries([CATEGORY_KEY]);
    },
    onError: (error) => {
      console.error(error?.response?.data?.message || "Failed to update category");
    },
  });

  const remove = useMutation({
    mutationFn: (categoryId) => deleteCategory(categoryId, token),
    onSuccess: () => {
      queryClient.invalidateQueries([CATEGORY_KEY]);
    },
    onError: (error) => {
      console.error(error?.response?.data?.message || "Failed to delete category");
    },
  }); 

  return {
    categories,
    isLoading,
    isError,
    create,
    update,
    remove
    
  };
}

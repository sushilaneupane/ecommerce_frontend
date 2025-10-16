import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/categoryApi";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategories, createCategory } from "../api/categoryApi";

export const useCategories = (token) => {
  const queryClient = useQueryClient();

  // Fetch categories
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Create category mutation
  const create = useMutation({
    mutationFn: (categoryData) => createCategory(categoryData, token),
    onSuccess: () => {
      // Invalidate categories query to refetch
      queryClient.invalidateQueries(["categories"]);
    },
  });

  return { ...categoriesQuery, create };
};

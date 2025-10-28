import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, loginUser, getUserProfile, updateUser } from "../api/usersApi";
import { USER_KEY } from "@/utils/queryKeys";

export function useUser() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user"));

 
  const { data: userProfile, isLoading, isError } = useQuery({
    queryKey: [USER_KEY, user?.id],
    queryFn: () => getUserProfile(user?.id, token),
    enabled: !!user?.id && !!token,
  });

  
  const create = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries([USER_KEY]);
    },
  });

  const login = useMutation({
    mutationFn: loginUser,
  });

  const update = useMutation({
    mutationFn: ({ id, payload }) => updateUser(id, payload, token),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(["user", id]);
    },
    onError: (error) => {
      console.error("Failed to update user:", error?.message || error);
    },
  });

  return {
    userProfile,
    isLoading,
    isError,
    create,
    login,
    update,
  };
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAddressByUserId, createAddress, updateAddress } from "../api/addressApi";
import { toast } from "sonner";

export const useAddress = (userId, token) => {
  const queryClient = useQueryClient();

  // 🟢 Fetch Address
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["userAddress", userId],
    queryFn: () => getAddressByUserId(userId, token),
    enabled: !!userId && !!token,
  });


  const address = Array.isArray(data) ? data[0] || null : data || null;


  const createMutation = useMutation({
    mutationFn: (payload) => createAddress(payload, token),
    onSuccess: () => {
      toast.success("Address saved successfully!");
      queryClient.invalidateQueries(["userAddress"]);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to save address.");
    },
  });


   const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => updateAddress(id, payload, token),
    onSuccess: () => {
      toast.success("Address updated successfully!");
      queryClient.invalidateQueries(["userAddress", userId]);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update address.");
    },
  });

  const clearCache = () => {
    queryClient.removeQueries(["userAddress", userId]);
    createMutation.reset();
    updateMutation.reset();
  };

  return {
    address,
    isLoading,
    isError,
    refetch,
    createAddress: createMutation.mutate,
    isCreating: createMutation.isLoading,
    updateAddress: updateMutation.mutate,
    isUpdating: updateMutation.isLoading,
    clearCache,
  };
};

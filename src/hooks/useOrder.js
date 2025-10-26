import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrders, createOrder as createOrderApi, updateOrderApi, getAllOrders } from "../api/orderApi";
import { ORDER_KEY } from "@/utils/queryKeys";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useOrders() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user"));

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [ORDER_KEY, user?.id],
    queryFn: () => getOrders(user?.id, token),
    enabled: !!user?.id && !!token,
  });

  const {
    data: allOrders = [],
    isLoading: isLoadingAll,
    isError: isErrorAll,
    error: errorAll,
  } = useQuery({
    queryKey: [ORDER_KEY, "all"],
    queryFn: () => getAllOrders(token),
    enabled: !!token,
  });

  const createOrder = useMutation({
    mutationFn: async (payload) => {
      return await createOrderApi({ ...payload, userId: user?.id }, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([ORDER_KEY, user?.id]);
      toast.success("Order placed successfully!");
      setTimeout(() => navigate("/"), 1500);
    },
  });

  const update = useMutation({
    mutationFn: async ({ orderId, orderStatus }) => {
      return await updateOrderApi(orderId, { orderStatus }, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([ORDER_KEY, user?.id]);
      toast.success("Order updated successfully!");
    },
  });

  return {
    orders,
    allOrders,
    isLoading,
    isLoadingAll,
    isErrorAll,
    isError,
    error,
    createOrder,
    update: update.mutate,
  };
}

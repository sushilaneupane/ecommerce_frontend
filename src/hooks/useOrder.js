import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getOrders, 
  createOrder as createOrderApi, 
  updateOrderApi, 
  getAllOrders, 
  getTotalOrders 
} from "../api/orderApi";
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
    mutationFn: async (payload) =>
      createOrderApi({ ...payload, userId: user?.id }, token),
    onSuccess: () => {
      queryClient.invalidateQueries([ORDER_KEY, user?.id]);
      queryClient.invalidateQueries([ORDER_KEY, "total-orders"]);
      toast.success("Order placed successfully!");
      setTimeout(() => navigate("/"), 1500);
    },
  });

  const {
    data: totalOrderCount = [],
    isLoading: isTotalLoading,
    isError: isTotalError,
    error: errorTotal,
  } = useQuery({
    queryKey: [ORDER_KEY, "total-orders"],
    queryFn: () => getTotalOrders(token),
    enabled: !!token,
  });
  
    const update = useMutation({
      mutationFn: async ({ orderId, orderStatus }) => {
        return await updateOrderApi(orderId, { orderStatus }, token);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([ORDER_KEY, "all"]);
        toast.success("Order updated successfully!");
      },
    });

    

  return {
    
    orders,
    allOrders,
    totalOrderCount,
    isLoading,
    isLoadingAll,
    isTotalLoading,
    isError,
    isErrorAll,
    isTotalError,
    error,
    errorAll,
    createOrder,
    update,
  };
}

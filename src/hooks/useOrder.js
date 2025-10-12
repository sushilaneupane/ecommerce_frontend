
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrders, createOrder as createOrderApi } from "../api/orderApi";
import { ORDER_KEY } from "@/utils/queryKeys";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useOrders() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch orders
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

  // ✅ Create order mutation
  const createOrder = useMutation({
    mutationFn: async ({
      shippingCost,
      totalAmount,
      addressId,
      products,
      transactionId,
      paymentMethod,
    }) => {
      const payload = {
        userId: user?.id,
        shippingCost,
        totalAmount,
        addressId,
        products,
        transactionId,
        paymentMethod,
      };
      return await createOrderApi(payload, token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries([ORDER_KEY, user?.id]);
      toast.success("Order placed successfully!");
      setTimeout(() => navigate("/"), 1500);
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to place the order.";
      toast.error(message);
      console.error(message);
    },
  });

  return {
    orders,
    isLoading,
    isError,
    error,
    createOrder,
  };
}

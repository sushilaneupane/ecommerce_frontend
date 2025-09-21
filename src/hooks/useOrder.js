import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/orderApi";

export const useOrders = (userId, token) => {
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getOrders(userId, token),
    enabled: !!userId && !!token,
  });
};

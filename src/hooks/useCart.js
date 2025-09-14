
import { useQuery, useMutation, useQueryClient, skipToken } from "@tanstack/react-query";
import { getCartsByUserId, createCart } from "../api/cartApi";
import { CART_KEY } from "@/utils/queryKeys";

export function useCart() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user"));

  
  const { data: cartItems = [], isLoading, isError } = useQuery({
    queryKey: [CART_KEY,],
    queryFn: () => getCartsByUserId(user?.id, token),
    enabled: !!user?.id && !!token,
  });
  
  const create = useMutation({
    mutationFn: (cartData) => {
      const payload = { ...cartData, userId: user?.id };
    
      return createCart(payload, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([CART_KEY, user?.id]);
    },
  });
  return {
    cartItems,
    isLoading,
    isError,
    create,         
   
  };
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCartsByUserId, updateCart, deleteCart } from "../api/cartApi";

export function useCart(loggedInUser, token) {
  const queryClient = useQueryClient();

  /** Fetch cart items */
  const { data: cartItems = [], isLoading, isError } = useQuery({
    queryKey: ["cart", loggedInUser?.id],
    queryFn: () => getCartsByUserId(loggedInUser.id, token),
    enabled: !!loggedInUser?.id && !!token,
  });

  /** Update mutation */
  const updateMutation = useMutation({
    mutationFn: ({ cartItemId, productId, newQuantity }) =>
      updateCart(
        cartItemId,
        {
          quantity: newQuantity,
          userId: loggedInUser.id,
          productId,
        },
        token
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", loggedInUser?.id]);
    },
  });

  /** Delete mutation */
  const deleteMutation = useMutation({
    mutationFn: (cartId) => deleteCart(cartId, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", loggedInUser?.id]);
    },
  });

  return {
    cartItems,
    isLoading,
    isError,
    updateMutation,
    deleteMutation,
  };
}

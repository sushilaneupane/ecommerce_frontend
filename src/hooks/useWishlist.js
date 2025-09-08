import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWishlist, addToWishlist, removeFromWishlist } from "@/api/WishlistApi";
import { WISHLIST_KEY } from "@/utils/queryKeys";


export const useWishlist = () => {
  const queryClient = useQueryClient();

  const { data: wishlist, isLoading } = useQuery([WISHLIST_KEY], fetchWishlist);

  const addItem = useMutation(addToWishlist, {
    onSuccess: () => queryClient.invalidateQueries([WISHLIST_KEY]),
  });

  const removeItem = useMutation(removeFromWishlist, {
    onSuccess: () => queryClient.invalidateQueries([WISHLIST_KEY]),
  });

  return { wishlist, isLoading, addItem, removeItem };
};

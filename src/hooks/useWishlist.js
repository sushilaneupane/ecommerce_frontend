import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createwishlist, getWishlistByUserId, deleteWishlist } from "@/api/WishlistApi";
import { WISHLIST_KEY } from "@/utils/queryKeys";

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user"));

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: [WISHLIST_KEY],
    queryFn: () => getWishlistByUserId(user?.id, token),
    enabled: !!user?.id && !!token, // prevent fetching if no user
  });

  const create = useMutation({
    mutationFn: (wishlistData) => {
      const payload = { ...wishlistData, userId: user?.id };
      return createwishlist(payload, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([WISHLIST_KEY]);
    },
  });

  const remove = useMutation({
    mutationFn: (id) => deleteWishlist(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries([WISHLIST_KEY]);
    },
  });

  return { wishlist, isLoading, create, remove }; 
};

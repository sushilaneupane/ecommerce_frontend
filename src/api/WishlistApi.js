import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

export const createwishlist = async (wishlistData, token) => {
  const response = await api.post("/wishlist",wishlistData,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Add token here
      },
    }
  );
  return response.data;
};

export const getWishlistByUserId = async (userId, token) => {
  const response = await api.get(`/wishlist/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const deleteWishlist = async (userId, token) => {
  const response = await api.delete(`/wishlist/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
    });
    return response.data;
 
};

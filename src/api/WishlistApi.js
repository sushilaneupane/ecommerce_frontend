import axios from "./axiosInstance";

export const fetchWishlist = () => axios.get("/wishlist");
export const addToWishlist = (productId) => axios.post("/wishlist", { productId });
export const removeFromWishlist = (productId) => axios.delete(`/wishlist/${productId}`);

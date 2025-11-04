import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const ProductCard = ({ product }) => {
  console.log(product);
  
  const { isAuthenticated, loggedInUser, token } = useAuth();
  const navigate = useNavigate();
  const { create: addToCartAPI } = useCart(loggedInUser, token);
  const { create: addToWishlistAPI } = useWishlist();

  const handleLocalStorageSave = (key, productData) => {
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    const updated = [...existing, productData];
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      handleLocalStorageSave("guest_cart", { productId: product.id, quantity: 1 });
      toast.success("✅ Added to cart (Guest Mode)");
      return;
    }

    try {
      await addToCartAPI.mutateAsync({ productId: product.id, quantity: 1 });
      toast.success("Product Successfully added to cart");
      navigate("/cart");
    } catch {
      toast.error("This product is already in cart.");
    }
  };

  const handleAddToFavourites = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      handleLocalStorageSave("guest_wishlist", { productId: product.id });
      toast.success(" Saved to wishlist (Guest Mode)");
      return;
    }

    try {
      await addToWishlistAPI.mutateAsync({ productId: product.id });
      toast.success("Saved to wishlist");
      navigate("/wishlist");
    } catch {
      toast.error("This product is already in wishlist");
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="w-full">
      <Card className="w-full sm:w-64 cursor-pointer hover:shadow-lg transition-shadow duration-300 p-0">
        <img
          src={
            product?.images?.length
              ? `http://localhost:3001/uploads/${product.images[0].image}`
              : "/placeholder.jpg"
          }
          alt={product.productName}
          className="w-full h-36 sm:h-40 md:h-48 object-cover rounded-t-xl"
        />

        <CardContent className="p-3">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-base line-clamp-1">
              {product.productName}
            </CardTitle>
            <CardDescription className="text-sm line-clamp-2">
              {product.description}
            </CardDescription>
          </CardHeader>

          <div className="mt-2 flex items-center justify-between">
            <span className="font-bold text-sm">Rs {product.price}</span>

            <div className="flex gap-1">
              <Button
                onClick={handleAddToFavourites}
                variant="ghost"
                size="sm"
              >
                <Heart className="h-5 w-5 hover:text-red-600" />
              </Button>

              <Button
                onClick={handleAddToCart}
                variant="default"
                size="sm"
                className="bg-gray-800 text-white hover:bg-gray-900"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;

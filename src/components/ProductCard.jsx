import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/hooks/useWishlist";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();


  const { create } = useWishlist();

  const handleAddToFavourites = async () => {
    try {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
      await create.mutateAsync({
        productId: product.id,
      });

      console.log("✅ Added to favourites:", product.id);
      navigate("/wishlist");
    } catch (error) {
      console.error("❌ Failed to add to favourites:", error);
    }
  };

  return (
    <Card
      key={product.id || Math.random()}
      className="w-full sm:w-64 hover:shadow-lg transition-shadow duration-300"
    >
      <img
        src={product?.images?.[0]?.image || "/placeholder.png"}
        alt={product?.productName || "Product"}
        className="w-full h-36 object-contain rounded-t-md bg-white"
      />

      <CardContent className="p-3">
        <CardHeader className="p-0 mb-2">
          {/* Wrap only title and description in Link */}

          <CardTitle className="text-base line-clamp-1">
            <Link
              to={`/product/${product.id}`}
              
            >
              {product?.productName}
            </Link>
          </CardTitle>
          <CardDescription className="text-sm line-clamp-2">
            {product?.description || "No description available"}
          </CardDescription>

        </CardHeader>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-sm">
            {product?.price ? `$${product.price}` : "N/A"}
          </span>
          <Button
            onClick={handleAddToFavourites}
            variant="ghost"
            className="flex items-center"
          >
            <Heart className="h-6 w-6 text-gray-700 hover:text-red-600" />
          </Button>
        </div>
      </CardContent>
    </Card>


  );
};

export default ProductCard;

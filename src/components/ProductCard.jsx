import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
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
import { toast } from "sonner";


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
      await create.mutateAsync({ productId: product.id });
      toast.success("✅ Added to favourites");
      navigate("/wishlist");
    } catch (error) {
      toast.error("Failed to add to favourites");
    }
  };

  return (
 

  <Link to={`/product/${product.id}`} className="w-full">
  <Card className="w-full sm:w-64 cursor-pointer hover:shadow-lg transition-shadow duration-300 p-0 cursor-pointer">
    <img
      src={`http://localhost:3001/uploads/${product.images[0].image}`}
      alt={product?.productName || "Product"}
      className="w-full h-36 sm:h-40 md:h-48 object-cover rounded-t-xl bg-red-200"
    />

    {/* Content below the image */}
    <CardContent className="p-3">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base line-clamp-1">
          {product?.productName}
        </CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {product?.description || "No description available"}
        </CardDescription>
      </CardHeader>

      {/* Price and Favourites button */}
      <div className="mt-2 flex items-center justify-between">
        <span className="font-bold text-sm">
          {product?.price ? `Rs ${product.price}` : "N/A"}
        </span>
        <Button
          onClick={(e) => {
            e.preventDefault(); 
            handleAddToFavourites();
          }}
          variant="ghost"
          className="flex items-center"
        >
          <Heart className="h-6 w-6 text-gray-700 hover:text-red-600" />
        </Button>
      </div>
    </CardContent>
  </Card>
</Link>

  );
};

export default ProductCard;

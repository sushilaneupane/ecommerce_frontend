import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/hooks/useWishlist";

const Wishlist = () => {
  const { wishlist, isLoading, remove } = useWishlist();
  const [loadingId, setLoadingId] = useState(null);

  const safeWishlist = Array.isArray(wishlist) ? wishlist : [];
  console.log("Wishlist data from API:", safeWishlist);

  const handleRemove = (wishlistId) => {
    setLoadingId(wishlistId); 
    remove.mutate(wishlistId, {
      onSettled: () => setLoadingId(null),
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-600">Loading wishlist...</span>
      </div>
    );
  }

  return (
    <div className="my-10 px-4 mt-20">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Wishlist</h2>

      {safeWishlist.length === 0 ? (
        <p className="text-center text-gray-500">
          No items in your favourites.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {safeWishlist.map((item) => (
            <Card key={item.wishlistId} className="relative shadow-md hover:shadow-lg transition">
              <Link to={`/product/${item.productId}`} className="block">
                <img
                  src={item.images[0] || "/placeholder.png"}
                  alt={item.productName}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="p-4 text-center">
                  <CardHeader className="p-0">
                    <CardTitle className="text-sm font-semibold text-gray-800">
                      {item.productName}
                    </CardTitle>
                  </CardHeader>
                  <p className="text-sm text-gray-600">Rs {item.price}</p>
                </CardContent>
              </Link>

              {/* Remove from wishlist */}
              <Button
                variant="ghost"
                size="icon"
                disabled={loadingId === item.wishlistId}
                onClick={() => handleRemove(item.wishlistId)}
                className="absolute top-2 right-2 rounded-full bg-white shadow-sm hover:bg-red-100"
              >
                {loadingId === item.wishlistId ? (
                  <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                ) : (
                  <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                )}
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

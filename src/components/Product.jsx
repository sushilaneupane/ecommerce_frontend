// ProductCard.js
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <img
          src={product.imageUrl || "/image/cardimage.jpg"}
          alt={product.productName || "Product Image"}
          className="w-full h-48 object-cover rounded-t-md"
        />
        <CardContent className="text-center">
          <p className="font-medium text-lg">{product.productName || "Unknown Product"}</p>
          <p className="text-sm text-gray-600">RS {product.price}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="default" size="sm">
            View Product
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    productName: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default ProductCard;

import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Card from "./Card";

function ProductCard({ product, addToCart }) {
  return (
    <Card className="product-card">
      <Link to={`/product/${product.id}`} className="product-image">
        <img src={product.image} alt={product.title} />
      </Link>

      <div className="product-info">
        <span className="category">
          {product.category}
        </span>

        <Link
          to={`/product/${product.id}`}
          className="product-title"
        >
          {product.title}
        </Link>

        <div className="product-bottom">
          <strong>${product.price.toFixed(2)}</strong>

          <Button onClick={() => addToCart(product)}>
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;
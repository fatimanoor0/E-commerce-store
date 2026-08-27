import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";

function ProductDetails({ addToCart }) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="loading page-loading">
        <div className="spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return <div className="empty">Product not found.</div>;
  }

  return (
    <section className="details-page">
      <Link to="/" className="back-link">
        ← Back to products
      </Link>

      <div className="details-container">
        <div className="details-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="details-info">
          <span className="category">
            {product.category}
          </span>

          <h1>{product.title}</h1>

          <div className="rating">
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </div>

          <h2>${product.price.toFixed(2)}</h2>

          <p>{product.description}</p>

          <Button onClick={() => addToCart(product)}>
            Add to Cart 🛒
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
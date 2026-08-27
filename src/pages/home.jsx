import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;

    if (category !== "all") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (search.trim()) {
      result = result.filter((product) =>
        product.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [search, category, products]);

  const categories = [
    "all",
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  return (
    <div>
      <section className="hero">
        <div>
          <p className="hero-small">WELCOME TO SHOPORA</p>

          <h1>
            Discover products
            <br />
            you'll <span>love.</span>
          </h1>

          <p className="hero-text">
            Explore our collection of stylish products,
            electronics, jewelry and more.
          </p>

          <a href="#products" className="hero-btn">
            Shop Now ↓
          </a>
        </div>

        <div className="hero-shape">
          🛍️
        </div>
      </section>

      <section className="shop-section" id="products">
        <div className="section-heading">
          <div>
            <p className="section-label">OUR COLLECTION</p>
            <h2>Featured Products</h2>
          </div>

          <div className="search-box">
            🔎
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filters">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item === "all"
                ? "All"
                : item.charAt(0).toUpperCase() +
                  item.slice(1)}
            </button>
          ))}
        </div>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        )}

        {error && <div className="error">{error}</div>}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="empty">
            <h3>No products found 😔</h3>
            <p>Try another search or category.</p>
          </div>
        )}

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>

      <footer className="footer">
        <h3>Shopora<span>.</span></h3>
        <p>Simple shopping. Better experience.</p>
        <p>© 2026 Shopora. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
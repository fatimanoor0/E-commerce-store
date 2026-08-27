import React from "react";
import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          Shopora<span>.</span>
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/cart" className="cart-link">
            🛒 Cart
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
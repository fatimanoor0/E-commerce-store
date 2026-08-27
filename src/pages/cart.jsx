import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section className="empty-cart">
        <div className="empty-icon">🛒</div>
        <h1>Your cart is empty</h1>
        <p>Add some products to get started.</p>

        <Link to="/">
          <Button>Start Shopping</Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="page-title">
        <p className="section-label">SHOPPING CART</p>
        <h1>Your Cart</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />

              <div className="cart-product-info">
                <h3>{item.title}</h3>
                <p>${item.price.toFixed(2)}</p>

                <div className="quantity">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-right">
                <strong>
                  ${(item.price * item.quantity).toFixed(2)}
                </strong>

                <button
                  className="remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <Link to="/checkout">
            <Button>Proceed to Checkout →</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;
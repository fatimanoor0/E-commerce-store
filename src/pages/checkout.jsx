import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/Modal";

function Checkout({ cart, setCart }) {
  const [isOpen, setIsOpen] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    setIsOpen(true);
    setCart([]);
  };

  if (cart.length === 0 && !isOpen) {
    return (
      <section className="empty-cart">
        <div className="empty-icon">📦</div>
        <h1>No items to checkout</h1>

        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="page-title">
        <p className="section-label">CHECKOUT</p>
        <h1>Order Summary</h1>
      </div>

      <div className="checkout-box">
        {cart.map((item) => (
          <div className="checkout-item" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div>
              <h3>{item.title}</h3>
              <p>
                Quantity: {item.quantity}
              </p>
            </div>

            <strong>
              ${(item.price * item.quantity).toFixed(2)}
            </strong>
          </div>
        ))}

        <div className="checkout-total">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>

        <Button onClick={placeOrder}>
          Place Order ✓
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="success-modal">
          <div className="success-icon">✓</div>
          <h2>Order Placed!</h2>
          <p>
            Thank you for shopping with Shopora.
          </p>

          <Link to="/">
            <Button onClick={() => setIsOpen(false)}>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Modal>
    </section>
  );
}

export default Checkout;
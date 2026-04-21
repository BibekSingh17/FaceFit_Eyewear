// BuyNow.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/BuyNow.scss";
import { toast } from 'react-toastify';

function BuyNow() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialState = location.state || (() => {
    const saved = JSON.parse(localStorage.getItem('cart') || '[]');
    return saved.length ? { items: saved } : null;
  })();

  const [checkoutState] = useState(initialState);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    return newErrors;
  };

  const buildPayload = () => {
    if (!checkoutState) return null;
    if (Array.isArray(checkoutState.items)) {
      return {
        items: checkoutState.items,
        customer: form,
      };
    }

    return {
      product: checkoutState,
      customer: form,
    };
  };

  const orderItems = checkoutState?.items || (checkoutState ? [checkoutState] : []);
  const totalPrice = orderItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * (item.quantity || 1),
    0
  );

  const handleOrder = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const payload = buildPayload();
      if (!payload) {
        toast.error('No product selected for checkout.')
        setIsLoading(false)
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/api/orders/order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error placing order');
      }

      toast.success("Order placed successfully!");
      localStorage.removeItem('cart');
      navigate("/");

    } catch (error) {
      toast.error(error.message || "Error placing order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!checkoutState) {
    return (
      <div className="buynow__container">
        <div className="buynow__card">
          <h2 className="buynow__title">Checkout</h2>
          <p>No product selected. Please add items to your cart or choose a product first.</p>
          <button className="buynow__button" onClick={() => navigate('/products')}>
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="buynow__container">
      <div className="buynow__card">
        <h2 className="buynow__title">Checkout</h2>

        <div className="buynow__product">
          {orderItems.length > 1 ? (
            <>
              <div className="buynow__product-name">Cart items</div>
              <ul className="buynow__cart-list">
                {orderItems.map((item) => (
                  <li key={item.id}>
                    {item.name} x {item.quantity || 1} - Rs {(item.price * (item.quantity || 1)).toFixed(2)}
                  </li>
                ))}
              </ul>
              <div className="buynow__product-price">Total: Rs {totalPrice.toFixed(2)}</div>
            </>
          ) : (
            <>
              <div className="buynow__product-name">{checkoutState.name}</div>
              <div className="buynow__product-price">Rs {checkoutState.price?.toFixed(2)}</div>
            </>
          )}
        </div>

        <div className="buynow__form">
          <input
            className={`buynow__input ${errors.name ? "buynow__input--error" : ""}`}
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={form.name}
          />
          <input
            className={`buynow__input ${errors.address ? "buynow__input--error" : ""}`}
            name="address"
            placeholder="Delivery Address"
            onChange={handleChange}
            value={form.address}
          />
          <input
            className={`buynow__input ${errors.phone ? "buynow__input--error" : ""}`}
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            value={form.phone}
          />
        </div>

        <button
          className="buynow__button"
          onClick={handleOrder}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="buynow__loading"></span>
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </div>
  );
}

export default BuyNow;
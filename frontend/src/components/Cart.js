import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';
import { getSessionId } from '../utils/session';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const sessionId = getSessionId();
      const response = await api.get(`/cart/${sessionId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(productId);
      return;
    }

    try {
      setUpdating(true);
      const sessionId = getSessionId();
      const response = await api.put(`/cart/${sessionId}/update`, {
        productId,
        quantity: newQuantity
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      setUpdating(true);
      const sessionId = getSessionId();
      const response = await api.delete(`/cart/${sessionId}/remove/${productId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setUpdating(false);
    }
  };

  const clearCart = async () => {
    if (!window.confirm('Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
      return;
    }

    try {
      setUpdating(true);
      const sessionId = getSessionId();
      const response = await api.delete(`/cart/${sessionId}/clear`);
      setCart(response.data);
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setUpdating(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="cart">
      <h1>Giỏ hàng của bạn</h1>
      {cart.items.length === 0 ? (
        <div className="empty-cart">
          <p>Giỏ hàng của bạn đang trống</p>
          <Link to="/" className="continue-shopping">
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.productId} className="cart-item">
                <Link to={`/product/${item.productId}`} className="cart-item-image">
                  <img
                    src={item.product.image || 'https://via.placeholder.com/150'}
                    alt={item.product.name}
                  />
                </Link>
                <div className="cart-item-info">
                  <Link to={`/product/${item.productId}`}>
                    <h3>{item.product.name}</h3>
                  </Link>
                  <p className="cart-item-price">{formatPrice(item.product.price)}</p>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      disabled={updating}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={updating}
                    >
                      +
                    </button>
                  </div>
                  <p className="cart-item-total">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                  <button
                    className="remove-button"
                    onClick={() => removeItem(item.productId)}
                    disabled={updating}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-total">
              <h2>Tổng cộng: {formatPrice(cart.total)}</h2>
            </div>
            <div className="cart-actions">
              <Link to="/" className="continue-shopping-button">
                Tiếp tục mua sắm
              </Link>
              <button className="clear-cart-button" onClick={clearCart} disabled={updating}>
                Xóa giỏ hàng
              </button>
              <button className="checkout-button" disabled>
                Thanh toán (Chưa có)
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;


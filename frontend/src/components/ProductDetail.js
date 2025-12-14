import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../config/api';
import { getSessionId } from '../utils/session';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product || product.stock === 0) return;

    try {
      setAdding(true);
      const sessionId = getSessionId();
      await api.post(`/cart/${sessionId}/add`, {
        productId: product.id,
        quantity: parseInt(quantity),
        product: product
      });
      alert('Đã thêm vào giỏ hàng!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Có lỗi xảy ra khi thêm vào giỏ hàng');
    } finally {
      setAdding(false);
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

  if (!product) {
    return <div className="error">Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="product-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>
      <div className="product-detail-container">
        <div className="product-image-large">
          <img src={product.image || 'https://via.placeholder.com/500'} alt={product.name} />
        </div>
        <div className="product-details">
          <h1>{product.name}</h1>
          <p className="product-price-large">{formatPrice(product.price)}</p>
          <div className="product-meta">
            <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
              {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
            </span>
            {product.category && (
              <span className="category">Danh mục: {product.category}</span>
            )}
          </div>
          <div className="product-description">
            <h3>Mô tả sản phẩm</h3>
            <p>{product.description || 'Chưa có mô tả'}</p>
          </div>
          <div className="add-to-cart-section">
            <div className="quantity-selector">
              <label>Số lượng:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <button
              className="add-to-cart-button"
              onClick={handleAddToCart}
              disabled={product.stock === 0 || adding}
            >
              {adding ? 'Đang thêm...' : product.stock > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;


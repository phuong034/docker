import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(`/products/search/${searchTerm}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
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
    <div className="product-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>

      <div className="products-grid">
        {products.length === 0 ? (
          <div className="no-products">Không tìm thấy sản phẩm nào</div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <div className="product-image">
                  <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">{formatPrice(product.price)}</p>
                  {product.stock > 0 ? (
                    <span className="in-stock">Còn hàng</span>
                  ) : (
                    <span className="out-of-stock">Hết hàng</span>
                  )}
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;


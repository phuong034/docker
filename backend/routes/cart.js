const express = require('express');
const router = express.Router();

// In-memory cart storage (since no login, we'll use session-based cart)
// In production, you might want to use Redis or database
let carts = {};

// Get cart by session ID
router.get('/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const cart = carts[sessionId] || { items: [], total: 0 };
  res.json(cart);
});

// Add item to cart
router.post('/:sessionId/add', (req, res) => {
  const { sessionId } = req.params;
  const { productId, quantity, product } = req.body;

  if (!carts[sessionId]) {
    carts[sessionId] = { items: [], total: 0 };
  }

  const existingItem = carts[sessionId].items.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity || 1;
  } else {
    carts[sessionId].items.push({
      productId,
      quantity: quantity || 1,
      product
    });
  }

  // Calculate total
  carts[sessionId].total = carts[sessionId].items.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  res.json(carts[sessionId]);
});

// Update item quantity
router.put('/:sessionId/update', (req, res) => {
  const { sessionId } = req.params;
  const { productId, quantity } = req.body;

  if (!carts[sessionId]) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const item = carts[sessionId].items.find(item => item.productId === productId);
  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      carts[sessionId].items = carts[sessionId].items.filter(i => i.productId !== productId);
    }
  }

  // Calculate total
  carts[sessionId].total = carts[sessionId].items.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  res.json(carts[sessionId]);
});

// Remove item from cart
router.delete('/:sessionId/remove/:productId', (req, res) => {
  const { sessionId, productId } = req.params;

  if (!carts[sessionId]) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  carts[sessionId].items = carts[sessionId].items.filter(item => item.productId !== parseInt(productId));

  // Calculate total
  carts[sessionId].total = carts[sessionId].items.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  res.json(carts[sessionId]);
});

// Clear cart
router.delete('/:sessionId/clear', (req, res) => {
  const { sessionId } = req.params;
  carts[sessionId] = { items: [], total: 0 };
  res.json(carts[sessionId]);
});

module.exports = router;


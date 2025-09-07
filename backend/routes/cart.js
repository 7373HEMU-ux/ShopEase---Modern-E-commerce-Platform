import express from 'express';
import auth from '../middleware/auth.js';
import Item from '../models/Item.js';

const router = express.Router();

// Get current user's cart
router.get('/', auth, async (req, res) => {
  await req.user.populate('cart.item');
  res.json(req.user.cart);
});

// Add item to cart or update qty: body { itemId, qty }
router.post('/add', auth, async (req, res) => {
  try {
    const { itemId, qty = 1 } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    const existing = req.user.cart.find(ci => ci.item.toString() === itemId);
    if (existing) existing.qty += Number(qty);
    else req.user.cart.push({ item: itemId, qty: Number(qty) });
    await req.user.save();
    await req.user.populate('cart.item');
    res.json(req.user.cart);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Remove item or set qty: body { itemId, qty }
router.post('/update', auth, async (req, res) => {
  try {
    const { itemId, qty } = req.body;
    const idx = req.user.cart.findIndex(ci => ci.item.toString() === itemId);
    if (idx === -1) return res.status(404).json({ msg: 'Not in cart' });
    if (qty <= 0) req.user.cart.splice(idx,1);
    else req.user.cart[idx].qty = Number(qty);
    await req.user.save();
    await req.user.populate('cart.item');
    res.json(req.user.cart);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Clear cart
router.post('/clear', auth, async (req, res) => {
  req.user.cart = [];
  await req.user.save();
  res.json([]);
});

export default router;




import express from 'express';
import Item from '../models/Item.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create item (admin use; for demo no admin check)
router.post('/', auth, async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.json(item);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Read - listing with filters: ?search=&minPrice=&maxPrice=&category=&page=&limit=
router.get('/', async (req, res) => {
  try {
    const { search, minPrice, maxPrice, category, page = 1, limit = 20 } = req.query;
    const q = {};
    if (search) q.name = { $regex: search, $options: 'i' };
    if (category) q.category = category;
    if (minPrice || maxPrice) q.price = {};
    if (minPrice) q.price.$gte = Number(minPrice);
    if (maxPrice) q.price.$lte = Number(maxPrice);
    const items = await Item.find(q).skip((page-1)*limit).limit(Number(limit));
    res.json(items);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Read single
router.get('/:id', async (req, res) => {
  try { const item = await Item.findById(req.params.id); res.json(item); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try { const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(item); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try { await Item.findByIdAndDelete(req.params.id); res.json({ ok: true }); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;




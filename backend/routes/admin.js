import express from 'express';
import AllowedUser from '../models/AllowedUser.js';

const router = express.Router();

// 📌 اضافه کردن یک نام کاربری به لیست مجاز
router.post('/add-allowed-username', async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await AllowedUser.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already allowed' });
    }

    const newAllowedUser = new AllowedUser({ username });
    await newAllowedUser.save();
    res.status(201).json({ message: 'Username added successfully', username });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// 📌 دریافت تمام نام‌های کاربری مجاز
router.get('/allowed-usernames', async (req, res) => {
  try {
    const allowedUsers = await AllowedUser.find();
    res.json(allowedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;

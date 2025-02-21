import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import AllowedUsername from "../models/AllowedUsernames.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // بررسی اینکه آیا نام کاربری در لیست مجاز هست یا نه
    const allowed = await AllowedUsername.findOne({ username });
    if (!allowed) {
      return res.status(403).json({ message: "این نام کاربری مجاز به ثبت‌نام نیست." });
    }

    // هش کردن رمز عبور
    const hashedPassword = await bcrypt.hash(password, 10);

    // ایجاد کاربر جدید
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "ثبت‌نام موفقیت‌آمیز بود." });

  } catch (error) {
    res.status(500).json({ message: "مشکلی پیش آمده است.", error });
  }
});

export default router;

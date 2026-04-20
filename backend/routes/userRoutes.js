const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const newUser = new User({
      name,
      email,
      age
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: "Failed to create user" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Failed to update user" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete user" });
  }
});

module.exports = router;

import { User } from "../models/user-model.js";
import { Product } from "../models/product-model.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ error: "Unable to get products." });
  }
};

// in query: attribute = attribute to be sorted on, order = 'asc' for ascending 'desc' for descending
// Sample usage: http://localhost:3001/products-sorted?attribute=name&order=asc
const getProductsSorted = async (req, res) => {
  try {
    const sortObject = {};
    sortObject[req.query.attribute] = req.query.order === "asc" ? 1 : -1;

    const products = await Product.find({}).sort(sortObject).exec();

    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ error: "Unable to get sorted products." });
    console.log(error);
  }
};

const addToCart = async (req, res) => {
  const productId = req.body.productId;
  const userId = req.body.userId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.shoppingCart.push(product);
    await user.save();

    res.status(201).json({ message: "Product added to cart." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to add product to cart." });
  }
};

const getCart = async (req, res) => {
  const user = req.body.user;

  try {
    const cart = user.shoppingCart;
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Unable to get cart." });
  }
};

const updateCart = async (req, res) => {
  const user = req.body.user;
  const newCart = req.body.newCart;

  try {
    user.shoppingCart = newCart;
    await user.save();

    res.status(200).json({ message: "Cart updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unable to update cart." });
  }
};

const checkOut = async (req, res) => {
  const user = req.body.user;

  try {
    user.shoppingCart = [];
    await user.save();

    res.status(201).json({ message: "Checkout successful." });
  } catch (error) {
    res.status(500).json({ error: "Unable to checkout." });
  }
};

export {
  getProducts,
  getProductsSorted,
  addToCart,
  getCart,
  updateCart,
  checkOut,
};

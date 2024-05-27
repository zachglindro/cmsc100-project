import { OrderTransaction } from "../models/order-transaction-model.js";
import { Product } from "../models/product-model.js";
import { User } from "../models/user-model.js";

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

const getProductByName = async (req,res) => {
  try {
      const product = await Product.findOne({name: req.query.name})
      res.status(201).json(product)
  }
  catch (error) {
      res.status(500).json({error: 'Product not found'})
  }
}


// 'http://localhost:3001/add-to-cart', {userId: user, productId: product}
const addToCart = async (req, res) => {
  const productId = req.body.productId;
  const userId = req.body.userId;
  var productInCart = false;
  try {
    const product = await Product.findOne({_id: productId});
    const user = await User.findOne({_id: userId});
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    
    for (let item of user.shoppingCart) {
      if (item.id === productId) {
        item.quantity = item.quantity+1
        productInCart = true
      }
    }
    if(!productInCart){
      product.quantity = 1;
      user.shoppingCart.push(product);
    }
    
    await user.save();
    res.status(201).json({ message: "Product added to cart." });
  } catch (error){
    res.status(500).json({ error: "Unable to add product to cart." });
    console.log(error)
  }
};

const removeFromCart = async (req, res) => {
  const productId = req.query.productId;
  const userId = req.query.userId;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Filter out the product from the user's shopping cart
    user.shoppingCart = user.shoppingCart.filter(item => item.id !== productId);

    await user.save();
    res.status(200).json({ message: "Product removed from cart." });
  } catch (error) {
    res.status(500).json({ error: "Unable to remove product from cart." });
    console.log(error);
  }
}

//http://localhost:3001/get-cart?userId=${userId}
const getCart = async (req, res) => {
  const userId = req.query.userId;

  try {
    const user = await User.findOne({_id: userId});

    const cart = user.shoppingCart.map(item => {
      return {
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        img: item.img
      };
    });

    // If there is a product out of stock, remove it from the cart
    for (let item of cart) {
      const product = await Product.findOne({_id: item._id});

      if (product.quantity === 0) {
        user.shoppingCart = user.shoppingCart.filter(cartItem => cartItem._id !== item._id);
        await user.save();
      }
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Unable to get cart." });
  }
};

// Removes all items in shopping cart, 
// creates order transactions for each product type in shopping cart
// http://localhost:3001/checkout?userId=${user}
const checkOut = async (req, res) => {
  const userId = req.query.userId;

  try {
    const user = await User.findOne({_id: userId});

    // const shippingFee = 45;  // Define the shipping fee
    // const subtotal = user.shoppingCart.reduce((total, item) => total + item.price * item.quantity, 0);
    // const amountToPay = subtotal + shippingFee;

    for (let item of user.shoppingCart) {
      let product = await Product.findOne({_id: item._id});
      product.quantity = product.quantity - item.quantity;

      await product.save();

      const currentDateTime = new Date();
      const amountToPay = item.price*item.quantity;

      const newOrderTransaction = new OrderTransaction({
        productId: item._id,
        productName: item.name,
        userId: user._id,
        orderQty: item.quantity,
        orderStatus: '0',
        email: user.email,
        dateOrdered: currentDateTime,
        amountToPay: amountToPay 
      });

      await newOrderTransaction.save();
    }

    user.shoppingCart = [];
    await user.save();

    res.status(201).json({ message: "Checkout successful." });
  } catch (error) {
    res.status(500).json({ error: "Unable to checkout." });
    console.log(error);
  }
};


const getUserOrderTransactions = async (req, res) => {
  const userId = req.query.userId;

  try {
    const orderTransactions = await OrderTransaction.find({ userId: userId });
    res.status(200).json(orderTransactions);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve order transactions." });
    console.log(error);
  }
};

const cancelOrder = async (req,res) => {
  try {
    const orderTransaction = await OrderTransaction.findOne({_id: req.query.transactionId})

    orderTransaction.orderStatus = '2'
    await orderTransaction.save()

    res.status(201).json({message: "Order successfully canceled"})
  } catch (error) {
    res.status(500).json({error: 'Unable to cancel order'})
  }
}

export {
  getProducts,
  getProductsSorted,
  getProductByName,
  addToCart,
  removeFromCart,
  getCart,
  checkOut,
  getUserOrderTransactions,
  cancelOrder
};

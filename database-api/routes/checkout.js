const getCheckoutCart = async (req, res) => {
    // differs from getCart in that it returns a list of
    // {product, quantity} objects
    const user = req.body.user;
  
    try {
      const cart = user.shoppingCart;
  
      // transform each product in cart into:
      // {product, quantity}
      const transformedCart = cart.map((product) => {
        return {
          product: product,
          quantity: cart.filter((p) => p.id === product.id).length,
        };
      });
      
      res.status(200).json(transformedCart);
    } catch (error) {
      res.status(500).json({ error: "Unable to get cart." });
    }
  };

export { getCheckoutCart };
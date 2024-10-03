const CartService = require("../services/CartService");
const cartService = new CartService();

exports.getCartById = async (req, res) => {
  try {
    const cart = await cartService.getById(req.params.id);
    if (!cart) {
      return res
        .status(404)
        .json({ error: "Carrito de compras no encontrado" });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTotalByCustomerId = async (req, res) => {
  try {
    const total = await cartService.getTotalByCustomerId(req.params.id);
    res.json(total);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const newCart = await cartService.addToCart(req.body);
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const updatedCart = await cartService.updateCart(req.body, req.params.id);
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import mongoose from 'mongoose';

await mongoose.connect('mongodb+srv://achillesheel0525:<password>@fortesting.q8ml0qz.mongodb.net/?retryWrites=true&w=majority&appName=fortesting');

const Product = mongoose.model('Product', {
    id: String,
    name: String,
    description: String,
    type: { type: Number, enum: [1, 2, 3] },
});

const getProducts = async (req, res) => {
    const products = await Product.find();
    res.send(products);
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product
}

const addProduct = async (req, res) => {
    const { id, name, description, type } = req.body;
    const product = new Product({ id, name, description, type });
    await product.save();
    res.send(product);
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.deleteOne({ id });
    res.send({ id });
}

export { getProducts, getProductById, addProduct, deleteProduct };
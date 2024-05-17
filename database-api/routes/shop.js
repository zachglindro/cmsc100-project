
const getProducts = async (req,res) => {
    try {
        const products = await Product.find()
        res.status(201).json(products)
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to get products.'})
    }
}

const addToCart = async (req,res) => {
    // get user
    
    // get shopping cart

    // update shopping cart to add order-transaction

}


const checkOut = async (req,res) => {}


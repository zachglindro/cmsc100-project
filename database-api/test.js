import needle from 'needle';

async function addToCart() {

    const userResponse = await needle('get', "http://localhost:3001/get-user-by-username?username=shopping_cart_test_user")
    //const productResponse = await needle('get', "http://localhost:3001/get-product-by-name?name=Test+Product+Name")
    const user = userResponse.body._id
    //const product = productResponse.body._id

    if(!user) {console.log('user not found')}
    //if(!product) {console.log('product not found')}
    
    
    //const postResponse = await needle('post', 'http://localhost:3001/add-to-cart', {userId: user, productId: product})
    //const cart = await needle('get', `http://localhost:3001/get-cart?userId=${user}`)
    //console.log(postResponse.body)

    //const remove = await needle('get', `http://localhost:3001/remove-from-cart?userId=${user}&productId=${product}`)
    //console.log(remove.body)

    //const checkout = await needle('get', `http://localhost:3001/checkout?userId=${user}`)
    //console.log(checkout.body)
    
    
    //const orderTransaction = await needle('get', `http://localhost:3001/get-order-by-user-product?userId=${user}&productId=${product}`)
    //const order = orderTransaction.body._id

    //const confirm = await needle('get',`http://localhost:3001/confirm-order?transactionId=${order}`)
    //console.log(confirm.body)

    //const cancel = await needle('get', `http://localhost:3001/cancel-order?transactionId=${order}`)
    //console.log(cancel.body)

    //const getOrders = await needle('get', 'http://localhost:3001/get-orders')
    //console.log(getOrders.body)

    //const salesReportProduct = await needle('get', 'http://localhost:3001/generate-sales-report-by-product')
    //console.log(salesReportProduct.body)

    const salesReportDate = await needle('get', 'http://localhost:3001/generate-sales-report-by-date?sortBy=week')
    console.log(salesReportDate.body)

}

addToCart();
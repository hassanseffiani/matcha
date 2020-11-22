const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');
module.exports = class Cart{
    static addProduct(id, price){
        fs.readFile(p , (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            // check if product already exist
            if (!err){
                cart = JSON.parse(fileContent);
            }
            //find index of product
            console.log(cart.products);
            let existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            let existingProduct = cart.products[existingProductIndex];
            let updateproduct;
            if (existingProduct){
                //if exist we get id update the qty.
                updateproduct = {...existingProduct};
                updateproduct.qty = updateproduct.qty + 1;
                cart.product[existingProductIndex] = updateproduct;
            }else{
                //if not exist we create a new product
                updateproduct = {id: id, qty: 1};
                // update product
                cart.products = {...updateproduct}
            }
            // total price
            cart.totalPrice = cart.totalPrice + +price;
            // write payment in file
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }
}
const Product = require('../models/product');
const Cart = require('../models/cart');

// Data product
exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/product-list',{
            pageTitle: 'Shop',
            prod: rows,
            path: '/products'
        });
    }).catch(err => console.log(err));    
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.FindById(prodId).then(([product]) => {
        console.log(product);
        res.render('shop/product-detail',{
            pageTitle: 'Detail',
            product: product[0],
            path: '/products'
        });
    }).catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    // MySql SELECT ALL data FROM table products
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/index',{
            pageTitle: 'Shop',
            prod: rows,
            path: '/'
        });
    }).catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/shop/cart'
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    // console.log(prodId);
    Product.FindById(prodId).then(product => {
        Cart.addProduct(prodId, product.price);
    }).catch();
    res.redirect('/cart');
    // res.render('shop/cart', {
    //     pageTitle: 'Your Cart',
    //     path: '/shop/cart'
    // });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/shop/orders'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}
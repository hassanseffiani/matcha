const Product = require('../models/product');

// Get product
exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

// Post product
exports.postAddProduct = (req, res, next) => {
    const product = new Product(null ,req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    product.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
};

// Edit products

exports.geteditProduct = (req, res, next) => {
    const editingMode = req.query.edit;
    if (!editingMode)
        res.redirect('/');
    const prodId = req.params.productId;
    Product.FindById(prodId).then(([product]) => {
        res.render("admin/edit-product", {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editingMode,
            product: product[0]
        });
    }).catch(err => console.log('This; the fucking error' + err));
};

exports.posteditProduct = (req, res, next) => {
    // console.log("DEBUG");
    const prodId = req.body.productId;
    const product = new Product(prodId ,req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    product.edit()
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
};

// Delete a product form a file product.json

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.delete(prodId);
    res.redirect('/admin/products');
}

//  Get products ADMIN
exports.getProductsAdmin = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('admin/products', {
            pageTitle: 'Admin Products',
            prods: rows,
            path: '/admin/products'
        });
    }).catch(err => console.log(err));
};
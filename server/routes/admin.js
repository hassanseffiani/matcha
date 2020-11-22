const adminController = require('../controllers/admin');

const express = require('express');
const router = express.Router();

// GET Load add page
// router.get('/add-product' , adminController.getAddProduct);

// // GET Load admin page
// router.get('/products', adminController.getProductsAdmin);

// // POST Send the inputs to a controller to save it in our file.
// router.post('/add-product' , adminController.postAddProduct);

// // GET Edit our page with help of {productID}
// router.get('/edit-product/:productId' , adminController.geteditProduct);

// //POST Send the new field to update info in our File.
// router.post('/edit-product' , adminController.posteditProduct);

// //POST delete product 
// router.post('/delete-product', adminController.deleteProduct);

module.exports = router;
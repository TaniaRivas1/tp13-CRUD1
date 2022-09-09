// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


// ************ Controller Require ************
const productsController = require('../controllers/productsController');



// Multer 

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'public/images/products')
    },
    filename : (req,file,callback) => {
        callback(null,`${Date.now()}_products_${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage
});

/*** GET ALL PRODUCTS /products ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create', upload.single('image'), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/update/:id', upload.single('image'), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;

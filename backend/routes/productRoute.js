
import express from 'express';
import {addProduct, listProducts, singleProduct, removeProduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router()

//'FIELDS' below Returns middleware that processes multiple files associated with the given form fields.
//The Request object will be populated with a files object which maps each field name to an array of the associated file information objects.
//@param fields — Array of Field objects describing multipart form fields to process.
//@throws — MulterError('LIMIT_UNEXPECTED_FILE') if more than maxCount files are associated with fieldName for any field.
productRouter.post('/add',adminAuth,upload.fields([{name:'image1', maxCount: 1},
    {name:'image2', maxCount: 1},{name:'image3', maxCount: 1},{name:'image4', maxCount: 1}
]),
 addProduct);
productRouter.get('/list', listProducts);
productRouter.post('/single', singleProduct);
productRouter.post('/remove',adminAuth, removeProduct);

// 'adminAuth' middleware gives the admin sole right to add/remove products

export default productRouter;
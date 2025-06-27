import express from 'express';
import ProductController from '../controller/product.controller';

const router = express.Router();
const productController = new ProductController();

router.get('/product/create_product', productController.createProduct);

router.get('/product/get_product', productController.getProduct);

export { router as productRouter };

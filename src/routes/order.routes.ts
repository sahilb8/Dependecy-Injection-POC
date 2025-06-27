import express from 'express';
import OrderController from '../controller/order.controller';

const router = express.Router();
const orderController = new OrderController();

router.get('/order/create_order', orderController.createOrder);

router.get('/order/get_order', orderController.getOrder);

export { router as orderRouter };

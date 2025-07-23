import 'reflect-metadata';
import express from 'express';
import { container } from './inversify.config'; // Main DI container
import { ProductController } from './modules/products/product.controller';
import { OrderController } from './modules/orders/order.controller';
import { PRODUCT_TYPES } from './modules/products/product.types';
import { ORDER_TYPES } from './modules/orders/order.types';

const app = express();
app.use(express.json());

// Get controllers from the DI container
const productController = container.get<ProductController>(
  PRODUCT_TYPES.ProductController,
);
const orderController = container.get<OrderController>(
  ORDER_TYPES.OrderController,
);

// Register the module-specific routers
app.use('/api/products', productController.router);
app.use('/api/orders', orderController.router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

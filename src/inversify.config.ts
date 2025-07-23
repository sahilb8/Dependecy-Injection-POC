import { Container } from 'inversify';
import 'reflect-metadata';

// --- Import from Products Module ---
import { ProductController } from './modules/products/product.controller';
import {
  IProductService,
  IProductRepository,
} from './modules/products/product.interfaces';
import { ProductService } from './modules/products/product.service';
import { PostgresProductRepository } from './modules/products/product.repository'; // Assuming a Postgres implementation
import { PRODUCT_TYPES } from './modules/products/product.types';

// --- Import from Orders Module ---
import { OrderController } from './modules/orders/order.controller';
import {
  IOrderService,
  IOrderRepository,
} from './modules/orders/order.interfaces';
import { OrderService } from './modules/orders/order.service';
import { PostgresOrderRepository } from './modules/orders/order.repository'; // Assuming a Postgres implementation
import { ORDER_TYPES } from './modules/orders/order.types';

// --- (Optional) Import from Core Module ---
// Example: import { IConfigService } from './core/config/config.interfaces.ts';
// Example: import { ConfigService } from './core/config/config.service.ts';
// Example: import { CORE_TYPES } from './core/core.types.ts';

/**
 * The main InversifyJS container for the entire application.
 * It is responsible for binding all interfaces to their concrete implementations.
 */
const container = new Container();

// --- Bindings for Core Module ---
// Example: container.bind<IConfigService>(CORE_TYPES.IConfigService).to(ConfigService).inSingletonScope();

// --- Bindings for Products Module ---

// Controller: Bind the controller to itself so it can be resolved in app.ts
container
  .bind<ProductController>(PRODUCT_TYPES.ProductController)
  .to(ProductController);

// Service: Bind the service interface to its concrete implementation
container
  .bind<IProductService>(PRODUCT_TYPES.IProductService)
  .to(ProductService);

// Repository: Bind the repository interface to its concrete implementation
// .inSingletonScope() ensures that the same instance of the repository is used throughout the app
container
  .bind<IProductRepository>(PRODUCT_TYPES.IProductRepository)
  .to(PostgresProductRepository)
  .inSingletonScope();

// --- Bindings for Orders Module ---

// Controller
container
  .bind<OrderController>(ORDER_TYPES.OrderController)
  .to(OrderController);

// Service
container.bind<IOrderService>(ORDER_TYPES.IOrderService).to(OrderService);

// Repository
container
  .bind<IOrderRepository>(ORDER_TYPES.IOrderRepository)
  .to(PostgresOrderRepository)
  .inSingletonScope();

// --- Add bindings for other modules (Pricing, Channels, etc.) here ---

// Export the configured container so it can be used in app.ts
export { container };

import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { IOrderService, IOrderRepository, Order } from './order.interfaces';
import { ORDER_TYPES } from './order.types';

// --- Inter-module dependency ---
// We import the repository INTERFACE and TYPES from the products module
// to check product details when creating an order.
import { IProductRepository } from '../products/product.interfaces';
import { PRODUCT_TYPES } from '../products/product.types';

/**
 * Contains the core business logic for managing orders.
 * It demonstrates inter-module dependency by using the ProductRepository.
 */
@injectable()
export class OrderService implements IOrderService {
  /**
   * The service's constructor injects its dependencies from its own module and others.
   * @param orderRepository An instance of a class that implements IOrderRepository.
   * @param productRepository An instance of a class that implements IProductRepository.
   */
  constructor(
    @inject(ORDER_TYPES.IOrderRepository)
    private orderRepository: IOrderRepository,
    @inject(PRODUCT_TYPES.IProductRepository)
    private productRepository: IProductRepository,
  ) {}

  /**
   * Finds a single order by its unique identifier.
   * @param id The unique ID of the order.
   * @returns A Promise resolving to the Order object or null if not found.
   */
  public async findById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  /**
   * Creates a new order after validating product information.
   * @param orderData The data for the new order, validated by the controller.
   * @returns A Promise resolving to the newly created Order.
   */
  public async create(
    customerId: string,
    productId: string,
    quantity: number,
  ): Promise<Order> {
    let totalAmount = 0;

    // Business Logic: Validate each product in the order and calculate the total.
    // for (const item of orderData.items) {
    const product = await this.productRepository.findById(productId);

    //     if (!product) {
    //         // If any product is not found, the entire order fails.
    //         throw new Error(`Product with ID ${item.productId} not found.`);
    //     }

    //     // You could also add stock checking logic here:
    //     // if (product.stock < item.quantity) {
    //     //   throw new Error(`Not enough stock for product ${product.name}`);
    //     // }

    //     totalAmount += product.price * item.quantity;
    // }

    const newOrder: Order = {
      id: `order_${Math.random().toString(36).substr(2, 9)}`, // Generate a random ID
      customerId,
      productId: product?.id ?? '',
      quantity,
    };

    // Once all checks pass and totals are calculated, save the order.
    return this.orderRepository.create(newOrder);
  }
}

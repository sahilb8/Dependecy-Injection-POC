import { injectable } from 'inversify';
import 'reflect-metadata';
import { IOrderRepository, Order } from './order.interfaces';

/**
 * A mock repository for orders that uses an in-memory array to simulate a database.
 * This class is responsible for all data access logic related to orders.
 */
@injectable()
export class PostgresOrderRepository implements IOrderRepository {
  // In-memory array to act as a database table for orders.
  private readonly orders: Order[] = [];

  /**
   * Finds a single order by its unique identifier from the in-memory store.
   * @param id The unique ID of the order.
   * @returns A Promise resolving to the Order object or null if not found.
   */
  public async findById(id: string): Promise<Order | null> {
    console.log(`[Repository] Finding order with id: ${id}`);
    const order = this.orders.find((o) => o.id === id);
    return order || null;
  }

  /**
   * Saves a new order to the in-memory store.
   * @param order The complete Order object to create.
   * @returns A Promise resolving to the created Order.
   */
  public async create(order: Order): Promise<Order> {
    console.log(
      `[Repository] Creating order for customer: ${order.customerId}`,
    );
    this.orders.push(order);
    // In a real database, the database would return the created record.
    // Here, we just return the object that was passed in.
    return order;
  }
}

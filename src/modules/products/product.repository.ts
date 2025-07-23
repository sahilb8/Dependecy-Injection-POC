import { injectable } from 'inversify';
import 'reflect-metadata';
import { IProductRepository, Product } from './product.interfaces';

/**
 * A mock repository for products that uses an in-memory array to simulate a database.
 * This class is responsible for all data access logic related to products.
 */
@injectable()
export class PostgresProductRepository implements IProductRepository {
  // In-memory array to act as a database table for products.
  private readonly products: Product[] = [
    // Pre-seed with some sample data for testing.
    {
      id: 'prod_123',
      name: 'Super Widget',
      sku: 'SW001',
      price: 99.99,
      inventory: 100,
    },
    {
      id: 'prod_456',
      name: 'Mega Gadget',
      sku: 'MG002',
      price: 149.5,
      inventory: 50,
    },
  ];

  /**
   * Finds a single product by its unique identifier from the in-memory store.
   * @param id The unique ID of the product.
   * @returns A Promise resolving to the Product object or null if not found.
   */
  public async findById(id: string): Promise<Product | null> {
    console.log(`[Repository] Finding product with id: ${id}`);
    const product = this.products.find((p) => p.id === id);
    return product || null;
  }

  /**
   * Saves a new product to the in-memory store.
   * @param product The complete Product object to create.
   * @returns A Promise resolving to the created Product.
   */
  public async create(product: Product): Promise<Product> {
    console.log(`[Repository] Creating product with name: ${product.name}`);
    this.products.push(product);
    return product;
  }
}

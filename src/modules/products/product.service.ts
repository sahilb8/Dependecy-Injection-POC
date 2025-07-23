import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import {
  IProductService,
  IProductRepository,
  Product,
} from './product.interfaces';
import { PRODUCT_TYPES } from './product.types';

/**
 * Contains the core business logic for managing products.
 * It orchestrates data flow by using the product repository.
 */
@injectable()
export class ProductService implements IProductService {
  /**
   * The service's constructor injects its dependencies.
   * @param productRepository An instance of a class that implements IProductRepository.
   */
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository)
    private productRepository: IProductRepository,
  ) {}

  /**
   * Finds a single product by its unique identifier.
   * @param id The unique ID of the product.
   * @returns A Promise resolving to the Product object or null if not found.
   */
  public async findById(id: string): Promise<Product | null> {
    console.log(`[Service] Finding product with id: ${id}`);
    // Business logic is simple here, just pass through to the repository.
    // More complex logic (e.g., checking permissions) could go here.
    return this.productRepository.findById(id);
  }

  /**
   * Creates a new product in the system.
   * @param productData The data for the new product, validated by the controller.
   * @returns A Promise resolving to the newly created Product.
   */
  public async create(productName: string): Promise<Product> {
    console.log(`[Service] Creating product with name: ${productName}`);
    // Here you could add logic like:
    // - Checking if a product with the same SKU already exists.
    // - Sanitizing data.
    // - Firing off events (e.g., "product_created").
    const newProduct: Product = {
      id: `prod_${Math.random().toString(36).substr(2, 9)}`, // Generate a random ID
      name: productName,
      inventory: 10,
      price: 999,
      sku: 'sku_1',
    };
    return this.productRepository.create(newProduct);
  }
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  inventory: number;
}

// The contract for any class that fetches product data
export interface IProductRepository {
  findById(productId: string): Promise<Product | null>;
  create(product: Product): Promise<Product>;
}

export interface IProductService {
  findById(productId: string): Promise<Product | null>;
  create(productName: string): Promise<Product>;
}

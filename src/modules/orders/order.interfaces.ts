export interface Order {
  id: string;
  customerId: string;
  productId: string;
  quantity: number;
}

// The contract for any class that fetches product data
export interface IOrderRepository {
  findById(orderId: string): Promise<Order | null>;
  create(order: Order): Promise<Order>;
}

export interface IOrderService {
  findById(orderId: string): Promise<Order | null>;
  create(
    customerId: string,
    productId: string,
    quantity: number,
  ): Promise<Order>;
}

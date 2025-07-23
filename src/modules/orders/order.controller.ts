import { injectable, inject } from 'inversify';
import { Router, Request, Response, NextFunction } from 'express';
import { IOrderService } from './order.interfaces';
import { ORDER_TYPES } from './order.types';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { validate } from 'class-validator';
// import { plainToClass } from 'class-transformer';

/**
 * Handles incoming HTTP requests for the /orders route.
 * It is responsible for routing, input validation, and delegating
 * business logic to the IOrderService.
 */
@injectable()
export class OrderController {
  /**
   * The Express router instance for this controller.
   * This will be exported and registered in the main app.ts.
   */
  public readonly router: Router;

  /**
   * The controller's constructor injects its dependencies.
   * @param orderService An instance of a class that implements IOrderService,
   * provided by the InversifyJS container.
   */
  constructor(
    @inject(ORDER_TYPES.IOrderService) private orderService: IOrderService,
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  /**
   * Binds the controller's methods to the Express router paths.
   */
  private initializeRoutes(): void {
    this.router.post('/', this.createOrder);
    this.router.get('/:id', this.getOrderById);
  }

  /**
   * Route handler for creating a new order.
   * @route POST /
   */
  private createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      // Transform the plain request body into an instance of our DTO class
      // const createOrderDto = plainToClass(CreateOrderDto, req.body);

      // Validate the DTO instance
      // const errors = await validate(createOrderDto);

      // if (errors.length > 0) {
      //     // If validation fails, send a 400 Bad Request response with the errors
      //     res.status(400).json({ message: 'Validation failed', errors });
      //     return;
      // }

      // If validation passes, delegate to the service layer
      const newOrder = await this.orderService.create('1', 'prod_123', 10);
      res.status(201).json(newOrder);
    } catch (error) {
      // Pass any other errors to the global error handler
      next(error);
    }
  };

  /**
   * Route handler for fetching a single order by its ID.
   * @route GET /:id
   */
  private getOrderById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const order = await this.orderService.findById(id);

      if (order) {
        res.status(200).json(order);
      } else {
        // If no order is found, send a 404 Not Found response
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      next(error);
    }
  };
}

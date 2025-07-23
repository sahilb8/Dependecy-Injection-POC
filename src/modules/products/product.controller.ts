import { injectable, inject } from 'inversify';
import { Router, Request, Response } from 'express';
import { IProductService } from './product.interfaces';
import { PRODUCT_TYPES } from './product.types';

@injectable()
export class ProductController {
  public readonly router: Router;

  constructor(
    @inject(PRODUCT_TYPES.IProductService)
    private productService: IProductService,
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/:id', this.getProductById);
    this.router.post('/', this.createProduct);
  }

  private getProductById = async (req: Request, res: Response) => {
    const product = await this.productService.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  };

  private createProduct = async (req: Request, res: Response) => {
    const newProduct = await this.productService.create('product_name');
    res.status(201).json(newProduct);
  };
}

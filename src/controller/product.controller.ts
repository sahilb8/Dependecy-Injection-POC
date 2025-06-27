import { Request, Response } from 'express';

class ProductController {
  createProduct = async (req: Request, res: Response) => {
    try {
      res.send({});
    } catch (error: unknown) {
      // Log unexpected errors at 'error' level with details of the request
      console.error(
        `Error in ProductController (createProduct). Input: req.body=${JSON.stringify(
          req.body,
        )}.`,
        error,
      );
      // Send generic error response
      res.sendStatus(500);
    }
  };

  getProduct = async (req: Request, res: Response) => {
    try {
      res.send({});
    } catch (error: unknown) {
      // Log unexpected errors at 'error' level with details of the request
      console.error(
        `Error in ProductController (getProduct). Input: req.body=${JSON.stringify(
          req.body,
        )}.`,
        error,
      );
      // Send generic error response
      res.sendStatus(500);
    }
  };
}

export default ProductController;

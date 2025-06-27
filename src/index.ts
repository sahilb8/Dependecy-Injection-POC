import express from 'express';
import { json } from 'body-parser';
import { orderRouter } from './routes/order.routes';
import { productRouter } from './routes/product.routes';

const app = express();
app.use(json());

app.use(orderRouter);
app.use(productRouter);

app.listen(4000, () => {
  console.log('started listening on port 4000');
});

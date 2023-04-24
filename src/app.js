import express from 'express'

import productsRouter from './Routers/products.router.js';
import cartsrouter from './Routers/carts.router.js';

const app= express();
app.use(express.json());
app.use(express.static('public'));

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsrouter)


app.listen(8080, () => {
  console.log('Server started on port 8080');
});
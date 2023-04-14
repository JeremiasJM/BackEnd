const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();


const productManager = new ProductManager();

app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getAllProducts();

  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.send({ products: limitedProducts });
  } else {
    res.send({ products });
  }
});

app.get('/products/:pid', async (req, res) => {
  const productId = req.params.pid;
  const product = await productManager.getProductById(productId);

  if (product) {
    res.send({ product });
  } else {
    res.status(404).send({ error: 'Product not found' });
  }
});

app.listen(8080, () => {
  console.log('Server Up');
});
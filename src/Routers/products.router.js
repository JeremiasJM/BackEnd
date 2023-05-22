import {Router} from 'express';
import fs from 'fs';
import ProductManager from '../dao/Manager/ProductManager.js';
import __dirname from '../utils.js'
import productsModel from '../dao/models/products.model.js';

const productsRouter = Router ();

productsRouter.get('/', async (req,res)=>{
  const products = await productsModel.find().lean().exec()
  console.log(products)
  res.render('list', {products})
})

productsRouter.get('/update/:name', async (req, res) => {
  const name = req.params.name
  const products = await productsModel.findOne({ name }).lean().exec()
  res.render('update', { products })
})

productsRouter.get('/create', (req,res)=>{
  res.render('create',{})
})

productsRouter.get('/:name', async (req,res)=>{
  const title= req.params.name
  const products= await productsModel.findOne({title}).lean().exec()
  res.render('one',{ products })
})

productsRouter.post('/', async (req,res)=>{
  const productsNew =req.body
  const productGenerated= new productsModel(productsNew)
  await productGenerated.save()
  res.redirect(`/products`)
})

productsRouter.put('/:name', async (req, res) => {
  const name = req.params.name
  console.log(name)
  const productNewdata = req.body
  console.log(productNewdata)
  try {
      await productsModel.updateOne({ name }, { ...productNewdata })
  } catch(err) {
      console.log('error.....')
      res.send({err})
  }
})

productsRouter.delete('/:name', async (req, res) => {
  const name = req.params.name
  try {
      await productsModel.deleteOne({ name })
  } catch (err) {
      res.send({err})
  }
}) 

/* const manager= new ProductManager(__dirname+'/data/productos.json')

const productsRouter = Router ();
// GET /api/products/
productsRouter.get('/', (req, res) => {
  const limit = req.query.limit
  let list= manager.getProducts()
  if(limit) {
      list = list.slice(0, limit)
  } 
  res.send(list)
  });

  productsRouter.get('/:pid', (req, res) => {
    const pid= req.params.pid
      const identified= manager.getProductsById(+pid)
      res.send(identified)
  });

// POST /api/products/
productsRouter.post('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync(__dirname+'/data/productos.json', 'utf8'));
  const newProduct = {
    id: products.length + 1,
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: true,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails || [],
  };
  if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category) {
    res.status(400).json({ error: 'Los campos son obligatorios' });
  } else {
    products.push(newProduct);
    fs.writeFileSync(__dirname+'/data/productos.json', JSON.stringify(products));
    res.send(newProduct);
  }
});

// PUT
productsRouter.put('/:pid', (req, res) => {
  const pid = req.params.pid;
  const products = JSON.parse(fs.readFileSync(__dirname+'/data/productos.json'));
  const productIndex = products.findIndex(p => p.id == pid);
  if (productIndex == -1) {
    res.status(404).send('Product not found');
  } else {
    const { id, ...rest } = req.body;
    const updatedProduct = { id: parseInt(pid), ...products[productIndex], ...rest };
    products[productIndex] = updatedProduct;
    fs.writeFileSync(__dirname+'/data/productos.json', JSON.stringify(products));
    res.json(updatedProduct);
  }
});

// DELETE
productsRouter.delete('/:pid', (req, res) => {
  const pid = req.params.pid;
  const products = JSON.parse(fs.readFileSync(__dirname+'/data/productos.json'));
  const productIndex = products.findIndex(p => p.id == pid);
  if (productIndex == -1) {
    res.status(404).send('Product not found');
  } else {
    products.splice(productIndex, 1);
    fs.writeFileSync(__dirname+'/data/productos.json', JSON.stringify(products));
    res.send('Product deleted');
  }
}); */


export default productsRouter;
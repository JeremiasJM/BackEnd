import {Router} from 'express';
import fs from 'fs';

const cartsrouter = Router ();
const readJSONFile = (filePath) => {
    try {
      const data = fs.readFileSync(filePath);
      return JSON.parse(data);
    } catch (error) {
      console.log(`Error reading file ${filePath}:`, error);
      return [];
    }
  };
  
  // Función para escribir un archivo JSON
  const writeJSONFile = (filePath, data) => {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.log(`Error writing file ${filePath}:`, error);
    }
  };
  
  // Ruta para crear un nuevo carrito
  cartsrouter.post('/', (req, res) => {
    const { products } = req.body;
    const cartId = Date.now().toString(); // Genera un id único basado en la fecha y hora actual
    const newCart = { id: cartId, products: products || [] };
    const carts = readJSONFile('carrito.json');
    carts.push(newCart);
    writeJSONFile('carrito.json', carts);
    res.status(201).json(newCart);
  });

  // Ruta para obtener los productos de un carrito
cartsrouter.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const carts = readJSONFile('carrito.json');
    const cart = carts.find((c) => c.id === cid);
    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  });
  // Ruta para agregar un producto a un carrito
cartsrouter.post('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const cartsData = JSON.parse(fs.readFileSync('carrito.json', 'utf-8'));
  const cart = cartsData.find((cart) => cart.id === cid);

  if (!cart) {
    return res.status(404).json({ error: 'No se encontró el carrito' });
  }

  const productsData = JSON.parse(fs.readFileSync('productos.json', 'utf-8'));
  const product = productsData.find((product) => product.id === pid);

  if (!product) {
    return res.status(404).json({ error: 'No se encontró el producto' });
  }

  const existingProduct = cart.products.find((cartProduct) => cartProduct.id === pid);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.products.push({ id: pid, quantity: 1 });
  }

  fs.writeFileSync('carrito.json', JSON.stringify(cartsData, null, 2));

  res.status(201).json(cart.products);
  });

cartsrouter.get('/',(req,res)=>{
    res.send('ok')
});

export default cartsrouter;
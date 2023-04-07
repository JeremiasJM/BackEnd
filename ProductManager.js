const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.nextId = 1;
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify([]));
    }
  }

  addProduct(product) {
    const products = this.getProducts();
    product.id = this.nextId++;
    products.push(product);
    this.saveProducts(products);
  }

  getProducts() {
    const products = fs.readFileSync(this.path);
    return JSON.parse(products);
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        ...updatedFields
      };
      this.saveProducts(products);
    }
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const newProducts = products.filter(product => product.id !== id);
    this.saveProducts(newProducts);
  }

  saveProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products));
  }
}

module.exports = ProductManager;



const pm = new ProductManager('productos.json');

pm.addProduct({
    title: 'Producto 1',
    description: 'Descripción del producto 1',
    price: 100000,
    thumbnail: 'ruta/de/imagen1.jpg',
    code: '123561351513',
    stock: 20
  });
  pm.addProduct({
    title: 'Producto 2',
    description: 'Descripción del producto 2',
    price: 10.5,
    thumbnail: 'ruta/de/imagen2.jpg',
    code: '123124123451',
    stock: 40
  });
  
  const products = pm.getProducts();
  console.log(products);
  
  const product = pm.getProductById(1);
  console.log(product);
  
  pm.updateProduct(1, { price: 500, stock: 15 });
  
  pm.deleteProduct(2);

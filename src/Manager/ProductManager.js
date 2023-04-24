import fs from 'fs'

class ProductManager {
  constructor() {
    this.path = ('./productos.json');
    this.nextId = 1;
    
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

  getProductsById= (id)=>{
        
    try {
        const list= this.getProducts()
        const found= list.find(product => product.id == id)

        if(found) return found
        return (`There isn't any product whose id is ${id}`)

    } catch (error) {
        console.log(error)
    }
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

export default ProductManager;



/* const pm = new ProductManager('productos.json');

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
  

 
  
 pm.updateProduct(1, { price: 500, stock: 15 });
 const product = pm.getProductById(1);
 console.log('Prodcuto seleccionado con id',product);
  
  pm.deleteProduct(2); 
   */
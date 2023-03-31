class ProductManager {
  constructor(products = []) {
    this.products = products;
    this.Id = 0;
  }

  addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error('Todos los Campos son Obligatorio');
      return;
    }
    if (this.products.some((p) => p.code === product.code)) {
      console.error('El producto con este codigo ya existe');
      return;
    }
    product.id = ++this.Id;
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.error('Not found');
    }
    return product;
  }
}

const manager = new ProductManager();

manager.addProduct({
  title: 'Television',
  description: 'Description de Television',
  price: 100000,
  thumbnail: 'link/de/una/imagen/television',
  code: 'code1',
  stock: 100
});

manager.addProduct({
  title: 'Celular',
  description: 'Description de Celular',
  price: 200000,
  thumbnail: 'link/de/una/imagen/celular',
  code: 'code2',
  stock: 200
});

console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(3)); //Registrara un msj de error


import generateProducto from "../utils/producto.util.js";

class ProductoService{
  constructor() {
    this.productos = [];
  }

  async listarUsuariosRandom() {
    this.productos = [];
    for (let index = 0; index < 5; index++) {
      const producto = {
        id: index + 1,
        ...generateProducto(),
      };
      this.productos.push(producto)
    }
    return this.productos;
  }

}

export default ProductoService;
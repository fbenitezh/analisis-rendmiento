import ProductoService from '../services/productos.service.js';
const productoService = new ProductoService();

class ProductoController {

  async listarUsuarios(req, res) {
    try {
      const usuarios = await productoService.listarUsuariosRandom();
      res.status(200).json({
        ok:true,
        data:usuarios
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error.message,
      });
    }
  }
}
export default ProductoController;

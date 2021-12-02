import ProductoService from '../services/productos.service.js';
import { logger } from '../utils/logger.js';
const productoService = new ProductoService();

class ProductoController {

  async listarUsuarios(req, res) {
    try {
      const usuarios = await productoService.listarUsuariosRandom();
      if(usuarios.length===0){
        logger.warn("no se encontraron usuarios");
      }
      logger.info(usuarios);
      res.status(200).json({
        ok:true,
        data:usuarios
      });
    } catch (error) {
      logger.error(error);
      res.status(400).json({
        ok: false,
        error: error.message,
      });
    }
  }
}
export default ProductoController;

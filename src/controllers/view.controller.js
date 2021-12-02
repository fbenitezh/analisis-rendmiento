import { processInfo } from '../utils/minimist.util.js';
import ProductoService from "../services/productos.service.js";
import { logger } from '../utils/logger.js';
const productoService = new ProductoService();

class ViewController{

  async renderProductos(req,res){
    try {
      const productos = await productoService.listarUsuariosRandom();
      if(productos.length===0){
        logger.warn("No se encontraron productos");
      }
      logger.info(productos);
      res.render('productos',{
        productos
      });
    } catch (error) {
      logger.error(error);
    }
  }
  
  getSystemInfo(req,res){
    const mensaje = `<b>Argumentos de entrada:</b> ${processInfo.commandLineArgs} <br>
    <b>Plataforma:</b> ${processInfo.sistemaOperativo} <br>
    <b>Versión node:</b> ${processInfo.nodeVersion} <br>
    <b>Memoria rss:</b> ${processInfo.memoriaRSS} <br>
    <b>Path de ejecución:</b> ${processInfo.nodePath} <br>
    <b>Process id:</b> ${processInfo.processId} <br>
    <b>Carpeta del proyecto:</b> ${processInfo.projectPath} <br>
    <b>Numero de procesos:</b> ${processInfo.cpus}<br>`;
    if(process.env.NODE_ENV == 'production'){
      logger.info(mensaje);
    }else{
      console.log(mensaje);
    }
    res.send(mensaje);
  }

}

export default ViewController;
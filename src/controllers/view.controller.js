import { processInfo } from '../utils/minimist.util.js';
import ProductoService from "../services/productos.service.js";
const productoService = new ProductoService();

class ViewController{

  async renderProductos(req,res){
    const productos = await productoService.listarUsuariosRandom();
    res.render('productos',{
      productos
    });
  }
  
  getSystemInfo(req,res){
    res.send(`
      <b>Argumentos de entrada:</b> ${processInfo.commandLineArgs} <br>
      <b>Plataforma:</b> ${processInfo.sistemaOperativo} <br>
      <b>Versión node:</b> ${processInfo.nodeVersion} <br>
      <b>Memoria rss:</b> ${processInfo.memoriaRSS} <br>
      <b>Path de ejecución:</b> ${processInfo.nodePath} <br>
      <b>Process id:</b> ${processInfo.processId} <br>
      <b>Carpeta del proyecto:</b> ${processInfo.projectPath} <br>
      <b>Numero de procesos:</b> ${processInfo.cpus}<br>
    `);
  }

}

export default ViewController;
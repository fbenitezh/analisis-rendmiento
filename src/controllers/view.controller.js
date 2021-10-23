import { processInfo } from '../utils/minimist.util.js';
import ProductoService from "../services/productos.service.js";
const productoService = new ProductoService();

class ViewController{

  async renderProductos(req,res){
    const productos = await productoService.listarUsuariosRandom();
    const {user} = req.session.passport;
    res.render('productos',{
      productos,
      nombre:user.displayName,
      foto:user.photos[0].value
    });
  }

  renderLogin(req,res){
    res.render('login',{});
  }

  failLogin(req,res){
    res.render('login-error',{});
  }

  renderLogout(req,res){
    try {
      req.logout();
      res.redirect('/');
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error.message,
      });
    }
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
    `);
  }

}

export default ViewController;
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
}

export default ViewController;
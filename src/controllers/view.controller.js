import ProductoService from "../services/productos.service.js";
const productoService = new ProductoService();

class ViewController{

  async index(req,res){
    if(!req.isAuthenticated()){
      const productos = await productoService.listarUsuariosRandom();
      res.render('productos',{
        productos,
        // nombre:req.session.passport.user.displayName,
        // foto:req.session.passport.user.photos[0].value
      });
    }else{
      res.redirect('/login');
    }
  }

  async renderLogin(req,res){
    res.render('login',{});
  }

  async failLogin(req,res){
    res.render('login-error',{});
  }

  async renderLogout(req,res){
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
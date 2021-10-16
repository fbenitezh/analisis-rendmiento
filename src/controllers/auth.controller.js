class AuthController {

  async renderLogin(req,res){
    res.render('login',{});
  }

  async logout(req, res) {
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
export default AuthController;

export const verifySession = (req,res,next)=>{
  try {
    console.log(req.user);
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect("/login");
    }
  } catch (error) {
    res.status(400).json({
      ok:false,
      error:error.message
    })
  }
}
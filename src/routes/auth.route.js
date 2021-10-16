import express from 'express';
const router = express.Router();
import passport from 'passport';
import AuthController from "../controllers/auth.controller.js";
const authController = new AuthController();


router.get("/facebook", passport.authenticate('facebook'));
router.get("/facebook/callback", passport.authenticate('facebook',{
  successRedirect:'/',
  failureRedirect:'/failLogin'
}));

router.post("/logout", authController.logout);

export default router;
import express from "express";
import ViewController from "../controllers/view.controller.js";
import {verifySession} from '../middlewares/verifySession.js';
const router = express.Router();
const viewController = new ViewController();

router.get("/login",viewController.renderLogin);
router.get("/logout", verifySession,viewController.renderLogout);
router.get("/failLogin",viewController.failLogin);
router.get("/",verifySession,viewController.renderProductos);

export default router;

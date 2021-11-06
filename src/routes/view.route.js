import express from "express";
import ViewController from "../controllers/view.controller.js";
const router = express.Router();
const viewController = new ViewController();

router.get("/info",viewController.getSystemInfo);
router.get("/",viewController.renderProductos);

export default router;

import express from "express";
import ViewController from "../controllers/view.controller.js";
import { infoRouteLogger } from "../middlewares/routeLogger.js";
const router = express.Router();
const viewController = new ViewController();

router.get("/info", infoRouteLogger,viewController.getSystemInfo);
router.get("/", infoRouteLogger,viewController.renderProductos);

export default router;

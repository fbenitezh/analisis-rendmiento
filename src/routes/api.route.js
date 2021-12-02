import { Router } from "express";
import ProductoController from "../controllers/productos.controller.js";
import RandomController from "../controllers/randomController.js";
import { infoRouteLogger } from "../middlewares/routeLogger.js";

class ApiRoute extends Router {
  constructor(props) {
    super(props);
    this.productoController = new ProductoController();
    this.randomController = new RandomController();

    this.get("/productos-test", infoRouteLogger,this.productoController.listarUsuarios);
    this.get("/randoms", infoRouteLogger,this.randomController.calcularAleatorio);
  }
}

export default ApiRoute;

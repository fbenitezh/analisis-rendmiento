import express from "express";
import cors from "cors";
import path from "path";
import handlebars from "express-handlebars";
import ApiRoute from "./routes/api.route.js";
import viewRoute from "./routes/view.route.js";
import {cacheControl} from './middlewares/cacheControl.js';

const apiRoute = new ApiRoute();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cacheControl);
app.use(express.static(path.resolve() + "/src/views"));

app.engine(
  ".hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: path.resolve() + "/src/views/layouts",
  })
);
  
app.set("views", path.resolve() + "/src/views");
app.set("view engine", ".hbs");

app.use("/api", apiRoute);
app.use("/", viewRoute);

export default app;

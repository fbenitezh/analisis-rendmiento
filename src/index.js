import express from "express";
import minimist from "minimist";
import cors from "cors";
import path from "path";
import handlebars from "express-handlebars";
import dotenv from "dotenv";
import ApiRoute from "./routes/api.route.js";
import viewRoute from "./routes/view.route.js";
import {cacheControl} from './middlewares/cacheControl.js';

dotenv.config();
const optionsMinimist = {
  alias:{
    p:'puerto',
  },
  default:{
    puerto:8080
  }
};
const arg = minimist(process.argv.slice(2),optionsMinimist);

const apiRoute = new ApiRoute();
const app = express();
const port = arg.puerto;

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

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});

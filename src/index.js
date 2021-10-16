import express from "express";
import cors from "cors";
import path from "path";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoSession from "connect-mongodb-session";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import ProductosRoute from "./routes/productos.route.js";
import viewRoute from "./routes/view.route.js";
import passport from "passport";
import {Strategy} from "passport-facebook";

dotenv.config();
const productosRoute = new ProductosRoute();
const app = express();
const port = process.env.PORT || 8080;
const { MONGODB_URI, SECRET_SESSION, NODE_ENV } = process.env;
const MongoStore = MongoSession(session);
const store = new MongoStore({
  uri: MONGODB_URI,
  collection: "sessions", // o como quieran llamar a la colección
});


//configuracion de passport facebook
const configFacebookStrategy = {
  clientID:process.env.FACEBOOK_CLIENT_ID,
  clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL:'/auth/facebook/callback',
  profileFields:['id','displayName','photos'],
  scope:['email']
};

passport.use(new Strategy(configFacebookStrategy,(accessToken,refreshToken,userProfile,done)=>{
  console.log(userProfile);
  //console.log(userProfile);
  return done(null,userProfile);
}));

passport.serializeUser((user,done)=>{
  done(null,user);
});

passport.deserializeUser((user,done)=>{
  done(null,user.id);
});
// Fin configuracion de facebook

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.resolve() + "/src/views"));

//sessions
app.use(
  session({
    store,
    resave: true,
    saveUninitialized: true,
    secret: SECRET_SESSION,
    cookie: {
      maxAge: 60 * 1000,
      sameSite: NODE_ENV == "production" ? "strict" : "lax",
    },
    rolling: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
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

app.use("/", viewRoute);
app.use("/api", productosRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});

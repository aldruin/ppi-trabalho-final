import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import pageNotFoundHandler from "./middlewares/pageNotFoundHandler.js";
import routes from "./routes/index.js";
import session from "express-session";
import autenticar from "./middlewares/autenticar.js";


const app = express();

app.use(session({
  secret: "s3gr3d0",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('src/frontend/public'));

app.use(autenticar, express.static('src/frontend/private'));

routes(app);

app.use(pageNotFoundHandler);

app.use(errorHandler);

export default app;
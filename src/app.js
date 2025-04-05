import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import pageNotFoundHandler from "./middlewares/pageNotFoundHandler.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

routes(app);

app.use(pageNotFoundHandler);

app.use(errorHandler);


export default app;
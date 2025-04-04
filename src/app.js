import express from "express";
import errorHandler from "./middlewares/ErrorHandler.js";
import pageNotFoundHandler from "./middlewares/pageNotFoundHandler.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(pageNotFoundHandler);

app.use(errorHandler);


export default app;
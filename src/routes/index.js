import express from "express";
import user from "./userRoutes.js";

const routes = (app) => {
  app.use(
    express.json(),
    user,
  );
};

export default routes;
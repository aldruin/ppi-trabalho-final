import express from "express";
import user from "./userRoutes.js";
import party from "./partyRoutes.js";

const routes = (app) => {
  app.use(
    express.json(),
    user,
    party,
  );
};

export default routes;
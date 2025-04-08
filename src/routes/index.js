import express from "express";
import user from "./userRoutes.js";
import party from "./partyRoutes.js";
import candidate from "./candidateRoutes.js";

const routes = (app) => {
  app.use(
    express.json(),
    user,
    party,
    candidate,
  );
};

export default routes;
import express from "express";
import PartyController from "../controllers/PartyController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router
  .get("/api/party", PartyController.findAll)
  .get("/api/party/:id", PartyController.findById)
  .post("/api/party", PartyController.create)
  .put("/api/party/:id", PartyController.update)
  .delete("/api/party/:id", PartyController.delete);

  export default (router);
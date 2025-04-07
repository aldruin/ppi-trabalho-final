import express from "express";
import PartyController from "../controllers/PartyController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router
  .get("/party", PartyController.findAll)
  .get("/party/:id", PartyController.findById)
  .post("/party", PartyController.create)
  .put("/party/:id", PartyController.update)
  .delete("/party/:id", PartyController.delete);

  export default (router);
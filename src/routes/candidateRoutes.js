import express from "express";
import CandidateController from "../controllers/CandidateController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router
  .get("/api/candidate", CandidateController.findAll)
  .get("/api/candidate/:id", CandidateController.findById)
  .post("/api/candidate", CandidateController.create)
  .put("/api/candidate/:id", CandidateController.update)
  .delete("/api/candidate/:id", CandidateController.delete);

export default (router);
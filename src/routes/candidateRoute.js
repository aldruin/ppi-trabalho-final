import express from "express";
import CandidateController from "../controllers/CandidateController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router
  .get("/candidate", paginate, CandidateController.findAll)
  .get("/candidate/:id", CandidateController.findById)
  .post("/candidate", CandidateController.create)
  .put("/candidate/:id", CandidateController.update)
  .delete("/candidate/:id", CandidateController.delete);

export default router;
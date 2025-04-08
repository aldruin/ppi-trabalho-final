import express from "express";
import UserController from "../controllers/UserController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router
  .get("/api/user/:id", UserController.findById)
  .post("/api/user", UserController.create)
  .put("/api/user/:id", UserController.update)
  .delete("/api/user/:id", UserController.delete);


  export default (router);
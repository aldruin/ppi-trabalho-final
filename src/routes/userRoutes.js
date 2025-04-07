import express from "express";
import UserController from "../controllers/UserController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router
  .get("/user/:id", UserController.findById)
  .post("/user", UserController.create)
  .put("/user/:id", UserController.update)
  .delete("/user/:id", UserController.delete);


  export default (router);
import express from "express";
import UserController from "../controllers/UserController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router
  .post("/user", UserController.create);

  export default (router);
import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/authHash.js";

export default class UserController{

  static async create(req, res, next){
    try{
      const { name, email, password } = req.body;

      const hashedPassword = await hashPassword(password);

      const user = await User.create(name, email, hashedPassword);

      if(!user){
        next();
      }

      return res.status(201).json({
        success: true,
        message: 'Cadastro realizado com sucesso.'
      });

    } catch(error){
      next(error);
    }
  }
}
import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/authHash.js";

export default class UserController{

  static async create(req, res, next){
    try{
      const { name, email, password } = req.body;

      const hashedPassword = await hashPassword(password);

      const user = await User.create(name, email, hashedPassword);

      if(!user){
        return next();
      }

      return res.status(201).json({
        success: true,
        message: 'Cadastro realizado com sucesso.'
      });

    } catch(error){
      next(error);
    }
  }

  static async findById(req, res, next){
    try{
      const id = parseInt(req.params.id, 10);
      const user = await User.findById(id);

      if(!user){
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado.'
        })
      }

      return res.status(200).json({
        success:true,
        message: 'Usuário obtido com sucesso',
        data: user

      })
    } catch(error){
      next(error);
    }
  }

  static async update(req, res, next){
    try{
      const id = parseInt(req.params.id, 10);
      const { name, email, password } = req.body;
      const updatedUser = await User.update(id, name, email, password);

      if(!updatedUser){
        return next();
      }

      return res.status(200).json({
        success: true,
        message: 'Os dados foram atualizados.',
        data: updatedUser
      });
    } catch(error){
      next(error);
    }
  }

  static async delete(req, res, next){
    try{
      const id = parseInt(req.params.id, 10);
      if(isNaN(id)){
        return next();
      }

      const deletedUser = await User.delete(id);

      if (!deletedUser) {
        return next();
      }

      return res.status(200).json({
        success: true,
        message: 'Usuário deletado'
      });
    } catch(error){
      next(error);
    }
  }

  static async login(req, res){
    try{
      const { email, password } = req.body;

      const user = await User.findByEmail(email);

      const redirectTo = req.session.redirectTo || '/';

      if(!user){
        return next();
      }

      const validatedPassword = await comparePassword(password, user.password);

      if(!validatedPassword){
        return next();
      }

      req.session.autenticado = true;
      res.redirect(redirectTo);
    } catch(error){
      next(error);
    }
  }
}
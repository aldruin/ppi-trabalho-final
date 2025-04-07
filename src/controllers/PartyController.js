import Party from "../models/Party.js";

export default class PartyController{
  static async create(req, res, next){
    try{
      const { name, initials, number } = req.body;

      const party = await Party.create(name, initials, number);

      if(!party){
        return next();
      }

      return res.status(201).json({
        success:true,
        message: 'Partido criado com sucesso.'
      });
    } catch(error){
      next(error);
    }
  }

  static async findAll(req, res, next){
    try{
      const partys = await Party.findAll();
      res.status(200).json({
        success: true,
        message: 'Partidos obtidos com sucesso.',
        partys: partys
      });
    } catch(error){
      next(error);
    }
  }

  static async findById(req, res, next){
    try{
      const id = parseInt(req.params.id, 10);
      const party = await Party.findById(id);

      if(!party){
        return next();
      }

      return res.status(200).json({
        success:true,
        message: 'Partido obtido com sucesso',
        data: party
      });
    } catch(error){
      next(error);
    }
  }

  static async update(req, res, next){
    try{
      const id = parseInt(req.params.id, 10);
      const { name, initials, number } = req.body;
      const updatedParty = await Party.update(id, name, initials, number);

      if(!updatedParty){
        return next();
      }

      return res.status(200).json({
        success:true,
        message: 'Partido atualizado.',
        data: updatedParty
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
      const deletedParty = await Party.delete(id);

      if(!deletedParty){
        return next();
      }

      return res.status(200).json({
        success:true,
        message:'Partido deletado'
      });
    } catch(error){
      next(error);
    }
  }
}
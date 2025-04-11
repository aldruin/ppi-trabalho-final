import Candidate from "../models/Candidate.js";
import Party from "../models/Party.js";

export default class CandidateController {
  static async create(req, res, next) {
    try {
      const {
        name,
        number,
        party_number,
        cpf,
        titulo_eleitor,
        endereco,
        bairro,
        cidade,
        uf,
        cep,
        renda_mensal
      } = req.body;
  
      const party = await Party.findByNumber(party_number);
      if (!party) {
        return res.status(400).json({ success: false, message: 'Partido informado não existe.' });
      }
  
      const candidate = await Candidate.create(
        name,
        number,
        party.id,
        cpf,
        titulo_eleitor,
        endereco,
        bairro,
        cidade,
        uf,
        cep,
        renda_mensal
      );
  
      return res.status(201).json({
        success: true,
        message: 'Candidato criado com sucesso.',
        data: candidate,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req, res, next) {
    try {
      const candidates = await Candidate.findAll();
      res.status(200).json({
        success: true,
        message: 'Candidatos obtidos com sucesso.',
        candidates: candidates,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findById(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10);
      const candidate = await Candidate.findById(id);

      if (!candidate) {
        return res.status(404).json({
          success: false,
          message: 'Candidato não encontrado.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Candidato obtido com sucesso.',
        data: candidate,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10);
      const {
        name,
        number,
        party_number,
        cpf,
        titulo_eleitor,
        endereco,
        bairro,
        cidade,
        uf,
        cep,
        renda_mensal
      } = req.body;
  
      const party = await Party.findByNumber(party_number);
      if (!party) {
        return res.status(404).json({
          success: false,
          message: "Partido com esse número não foi encontrado."
        });
      }
  
      const updated = await Candidate.update(
        id,
        name,
        number,
        party.id,
        cpf,
        titulo_eleitor,
        endereco,
        bairro,
        cidade,
        uf,
        cep,
        renda_mensal
      );
  
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Candidato não encontrado para atualizar."
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Candidato atualizado com sucesso."
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return next();
      }

      const deletedCandidate = await Candidate.delete(id);

      if (!deletedCandidate) {
        return next();
      }

      return res.status(200).json({
        success: true,
        message: 'Candidato deletado com sucesso.',
      });
    } catch (error) {
      next(error);
    }
  }
}
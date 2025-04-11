import CandidateDAO from "../database/CandidateDAO.js";

export default class Candidate {
    constructor(
      id,
      name,
      number,
      cpf,
      titulo_eleitor,
      endereco,
      bairro,
      cidade,
      uf,
      cep,
      renda_mensal,
      party
    ) {
      this.id = id;
      this.name = name;
      this.number = number;
      this.cpf = cpf;
      this.titulo_eleitor = titulo_eleitor;
      this.endereco = endereco;
      this.bairro = bairro;
      this.cidade = cidade;
      this.uf = uf;
      this.cep = cep;
      this.renda_mensal = renda_mensal;
      this.party = party;
    }

  static async create(name, number, party_id, cpf, titulo_eleitor, endereco, bairro, cidade, uf, cep, renda_mensal) {
    const party = { id: party_id };
    const candidate = new Candidate(null, name, number, cpf, titulo_eleitor, endereco, bairro, cidade, uf, cep, renda_mensal, party);
    return await CandidateDAO.create(candidate);
  }

  static async findAll() {
    const candidates = await CandidateDAO.findAll();
    return candidates.map((c) => {
      const party = {
        id: c.party_id,
        name: c.party_name,
        initials: c.party_initials,
        number: c.party_number,
      };
  
      return new Candidate(
        c.id,
        c.name,
        c.number,
        c.cpf,
        c.titulo_eleitor,
        c.endereco,
        c.bairro,
        c.cidade,
        c.uf,
        c.cep,
        c.renda_mensal,
        party
      );
    });
  }

  static async findById(id) {
    const c = await CandidateDAO.findById(id);
    return c
      ? new Candidate(
          c.id,
          c.name,
          c.number,
          c.party_id,
          c.cpf,
          c.titulo_eleitor,
          c.endereco,
          c.bairro,
          c.cidade,
          c.uf,
          c.cep,
          c.renda_mensal
        )
      : null;
  }

  static async update(id, name, number, party_id, cpf, titulo_eleitor, endereco, bairro, cidade, uf, cep, renda_mensal) {
    const party = { id: party_id };
    const candidate = new Candidate(
      id,
      name,
      number,
      cpf,
      titulo_eleitor,
      endereco,
      bairro,
      cidade,
      uf,
      cep,
      renda_mensal,
      party
    );
    await CandidateDAO.update(candidate);
    return true;
  }

  static async delete(id) {
    return await CandidateDAO.delete(id);
  }
}
import CandidateDAO from "../database/CandidateDAO.js";

export default class Candidate {
  constructor(id, name, number, party_id, cpf, titulo_eleitor, endereco, bairro, cidade, uf, cep, renda_mensal) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.party_id = party_id;
    this.cpf = cpf;
    this.titulo_eleitor = titulo_eleitor;
    this.endereco = endereco;
    this.bairro = bairro;
    this.cidade = cidade;
    this.uf = uf;
    this.cep = cep;
    this.renda_mensal = renda_mensal;
  }

  static async create(name, number, party_id, cpf, titulo_eleitor, endereco, bairro, cidade, uf, cep, renda_mensal) {
    const candidate = new Candidate(null, name, number, party_id, cpf, titulo_eleitor, endereco, bairro, cidade, uf, cep, renda_mensal);
    return await CandidateDAO.create(candidate);
  }

  static async findAll() {
    const candidates = await CandidateDAO.findAll();
    return candidates.map(
      (c) =>
        new Candidate(
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
    );
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
    const candidate = new Candidate(id, name, number, party_id, cpf, titulo_eleitor, endereco, bairro, cidade, uf, cep, renda_mensal);
    return await CandidateDAO.update(candidate);
  }

  static async delete(id) {
    return await CandidateDAO.delete(id);
  }
}
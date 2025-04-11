import connect from "./config/Connection.js";
import PartyDAO from "./PartyDAO.js";

export default class CandidateDAO {
  static async create(candidate) {
    const connection = await connect();
    try {
      const party = await PartyDAO.findById(candidate.party.id);
      if (!party) throw new Error("Partido não encontrado.");
  
      const sql = `
        INSERT INTO candidate 
          (name, number, party_id, cpf, titulo_eleitor, endereco, bairro, cidade, uf, cep, renda_mensal)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        candidate.name,
        candidate.number,
        candidate.party.id,
        candidate.cpf,
        candidate.titulo_eleitor,
        candidate.endereco,
        candidate.bairro,
        candidate.cidade,
        candidate.uf,
        candidate.cep,
        candidate.renda_mensal
      ];
  
      const [result] = await connection.execute(sql, values);
      return { id: result.insertId, ...candidate };
    } finally {
      await connection.release();
    }
  }

  static async findAll() {
    const connection = await connect();
    const sql = `
      SELECT 
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
      p.id AS party_id,
      p.name AS party_name,
      p.initials AS party_initials,
      p.number AS party_number
      FROM candidate c
      JOIN party p ON c.party_id = p.id
      ORDER BY c.id
      `;
    const [rows] = await connection.execute(sql);
    await connection.release();
    return rows;
  }

  static async findById(id) {
    const connection = await connect();
    const sql = `
      SELECT c.*, 
             p.name AS party_name, 
             p.initials AS party_initials, 
             p.number AS party_number
      FROM candidate c
      JOIN party p ON c.party_id = p.id
      WHERE c.id = ?
    `;
    const [rows] = await connection.execute(sql, [id]);
    await connection.release();
    return rows.length ? rows[0] : null;
  }

  static async update(candidate) {
    const connection = await connect();
      const [existingRows] = await connection.execute("SELECT * FROM candidate WHERE id = ?", [candidate.id]);
      if (!existingRows.length) return null;
  
      const sql = `
        UPDATE candidate
        SET name = ?, number = ?, party_id = ?, cpf = ?, titulo_eleitor = ?, endereco = ?, bairro = ?, cidade = ?, uf = ?, cep = ?, renda_mensal = ?
        WHERE id = ?
      `;
      const values = [
        candidate.name,
        candidate.number,
        candidate.party?.id || candidate.party_id,
        candidate.cpf,
        candidate.titulo_eleitor,
        candidate.endereco,
        candidate.bairro,
        candidate.cidade,
        candidate.uf,
        candidate.cep,
        candidate.renda_mensal,
        candidate.id
      ];
      console.log("VALUES SENDOS PASSADOS:", values);

  
      await connection.execute(sql, values);
      await connection.release();
      return values;
    }

  static async delete(id) {
    const connection = await connect();
    const sql = "DELETE FROM candidate WHERE id = ?";
    await connection.execute(sql, [id]);
    await connection.release();
    return true;
  }
}
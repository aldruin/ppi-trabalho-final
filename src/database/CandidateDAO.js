import connect from "./config/Connection.js";
import PartyDAO from "./PartyDAO.js";

export default class CandidateDAO {
  static async create(candidate) {
    const connection = await connect();

    try {
      const party = await PartyDAO.findById(candidate.party_id);
      if (!party) throw new Error("Partido não encontrado.");

      const sql = `
        INSERT INTO candidate (name, number, party_id)
        VALUES (?, ?, ?)
      `;
      const values = [candidate.name, candidate.number, candidate.party_id];

      const [result] = await connection.execute(sql, values);
      return { id: result.insertId, ...candidate };

    } finally {
      await connection.release();
    }
  }

  static async findAll() {
    const connection = await connect();
    const sql = `
      SELECT c.*, 
             p.name AS party_name, 
             p.initials AS party_initials, 
             p.number AS party_number
      FROM candidate c
      JOIN party p ON c.party_id = p.id
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

    try {
      const [existingRows] = await connection.execute(
        "SELECT * FROM candidate WHERE id = ?",
        [candidate.id]
      );
      if (!existingRows.length) return null;

      const party = await PartyDAO.findById(candidate.party_id);
      if (!party) throw new Error("Partido não encontrado.");

      const sql = `
        UPDATE candidate
        SET name = ?, number = ?, party_id = ?
        WHERE id = ?
      `;
      const values = [
        candidate.name,
        candidate.number,
        candidate.party_id,
        candidate.id
      ];

      await connection.execute(sql, values);
      return true;

    } finally {
      await connection.release();
    }
  }

  static async delete(id) {
    const connection = await connect();
    const sql = "DELETE FROM candidate WHERE id = ?";
    await connection.execute(sql, [id]);
    await connection.release();
    return true;
  }
}
import connect from "./config/Connection.js";

export default class PartyDAO{
  static async create(party){
    const connection = await connect();
    const sql =
      "INSERT INTO party (name, initials, number) VALUES (?, ?, ?)";
      const values = [
        party.name,
        party.initials,
        party.number
      ];
      await connection.execute(sql, values);
      await connection.release();
  }

  static async findAll(){
    const connection = await connect();
    const sql = "SELECT * FROM party";
    const [rows] = await connection.execute(sql);
    await connection.release();
    return rows;
  }

  static async findByNumber(number) {
    const connection = await connect();
    const sql = "SELECT * FROM party WHERE number = ?";
    const [rows] = await connection.execute(sql, [number]);
    await connection.release();
    return rows.length ? rows[0] : null;
  }

  static async findById(id){
    const connection = await connect();
    const sql = "SELECT * FROM user WHERE id = ?";
    const [rows] = await connection.execute(sql, [id]);

    await connection.release();

    return rows.length ? rows[0] : null;
  }

  static async update(party){
    const connection = await connect();
    const registeredParty = await PartyDAO.findById(party.id);
    if(!registeredParty){
      await connection.release();
      return null;
    }

    const {
      name = registeredParty.name,
      initials = registeredParty.initials,
      number = registeredParty.number
    } = party;

    const sql = `
      UPDATE party
      SET name = ?, initials = ?, number = ?
      WHERE id = ?
    `;

    const values = [name, initials, number, party.id];

    await connection.execute(sql, values);
    await connection.release();
    return true;
  }

  static async delete(id){
    const connection = await connect();
    const sql = "DELETE FROM party WHERE ID = ?";
    await connection.execute(sql, [id]);
    await connection.release();
    return true;
  }
}
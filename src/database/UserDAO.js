import connect from "./config/Connection.js";

export default class UserDAO{

  static async create(user){
    const connection = await connect();
    const sql =
      "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
      const values = [
        user.name,
        user.email,
        user.password
      ];
      await connection.execute(sql, values);
      await connection.release();
      return true;
  }

  static async findById(id){
    const connection = await connect();
    const sql = "SELECT * FROM user WHERE id = ?";
    const [rows] = await connection.execute(sql, [id]);

    await connection.release();

    return rows.length ? rows[0] : null;
  }

  static async findByEmail(email){
    const connection = await connect();
    const sql = "SELECT * FROM user WHERE email = ?";
    const [rows] = await connection.execute(sql, [email]);

    await connection.release();

    return rows.length ? rows[0] : null;
  }

  static async update(user){
    const connection = await connect();
    const registeredUser = await UserDAO.findById(user.id);
    if(!registeredUser){
      await connection.release();
      return null;
    }

    const {
      name = registeredUser.name,
      email = registeredUser.email,
      password = registeredUser.password
    } = user;

    const sql = `
      UPDATE user
      SET name = ?, email = ?, password = ?
      WHERE id = ?
    `;

    const values = [name, email, password, user.id];

    await connection.execute(sql, values);
    await connection.release();
    return true;
  }

  static async delete(id){
    const connection = await connect();
    const sql = "DELETE FROM user WHERE ID = ?";
    await connection.execute(sql, [id]);
    await connection.release();
    return true;
  }
}
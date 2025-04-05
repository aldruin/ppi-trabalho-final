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
  }

}
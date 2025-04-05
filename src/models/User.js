import UserDAO from "../database/UserDAO.js";

export default class User{
  constructor(id, name, email, password){
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  //

  static async create(name, email, password){
    const user = new User(null, name, email, password);

    const newUser = await UserDAO.create(user);
    return newUser;
  }
}
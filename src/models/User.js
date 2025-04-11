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
    return true;
  }

  static async findById(id){
    const user = await UserDAO.findById(id);

    return (user);
  }

  static async findByEmail(email){
    const user = await UserDAO.findByEmail(email);

    return (user);
  }

  static async update(id, name, email, password){
    const user = new User(id, name, email, password);
    const updatedUser = await UserDAO.update(user);
    return updatedUser;
  }

  static async delete(id){
    const deletedUser = await UserDAO.delete(id);
    return deletedUser;
  }
}
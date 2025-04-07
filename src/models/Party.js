import PartyDAO from "../database/PartyDAO.js";

export default class Party{
  constructor (id, name, initials, number){
    this.id = id;
    this.name = name;
    this.initials = initials;
    this.number = number;
    this.candidate = [];
  }
  //

  static async create(name, initials, number){
    const party = new Party(null, name, initials, number);

    const newParty = await PartyDAO.create(party);
    return newParty;
  }

  static async findAll(){
    const partys = await PartyDAO.findAll();
    return partys.map(
      (party) =>
        new Party(
          party.id,
          party.name,
          party.initials,
          party.number
        )
    );
  }

  static async findByNumber(number) {
    const party = await PartyDAO.findByNumber(number);
    return party;
  }
  
  static async findById(id){
    const party = await PartyDAO.findByid(id);

    return party;
  }

  static async update(id, name, initials, number){
    const party = new Party(id, name, initials, number);
    const updatedParty = await PartyDAO.update(party);
    return updatedParty;
  }

  static async delete(id){
    const deletedParty = await PartyDAO.delete(id);
    return deletedParty;
  }
}
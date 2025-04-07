import CandidateDAO from "../database/CandidateDAO.js";

export default class Candidate {
  constructor(id, name, number, party_id) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.party_id = party_id;
  }

  static async create(name, number, party_id) {
    const candidate = new Candidate(null, name, number, party_id);
    const newCandidate = await CandidateDAO.create(candidate);
    return newCandidate;
  }

  static async findAll() {
    const candidates = await CandidateDAO.findAll();
    return candidates.map(
      (candidate) =>
        new Candidate(
          candidate.id,
          candidate.name,
          candidate.number,
          candidate.party_id
        )
    );
  }

  static async findById(id) {
    const candidate = await CandidateDAO.findById(id);
    return candidate
      ? new Candidate(
          candidate.id,
          candidate.name,
          candidate.number,
          candidate.party_id
        )
      : null;
  }

  static async update(id, name, number, party_id) {
    const candidate = new Candidate(id, name, number, party_id);
    const updatedCandidate = await CandidateDAO.update(candidate);
    return updatedCandidate;
  }

  static async delete(id) {
    const deletedCandidate = await CandidateDAO.delete(id);
    return deletedCandidate;
  }
}
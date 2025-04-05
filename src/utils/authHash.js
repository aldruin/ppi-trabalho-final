import bcrypt from "bcrypt";
import crypto from "crypto";

const salts = 10;

export const hashPassword = async (password) => {
  try{
    const hash = await bcrypt.hash(password, salts);
    return hash;
  } catch(error){
    throw new Error('Erro ao criptografar a senha: ' + error.message);
  }
}

export const comparePassword = async(requestPassword, userPassword) => {
  try{
    const match = await bcrypt.compare(requestPassword, userPassword);
    return match;
  } catch(error){
    throw new Error('Erro ao comparar as senhas: ' + error.message);
  }
}

export const hashPasswordSHA256 = (password) => {
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  return hash;
}
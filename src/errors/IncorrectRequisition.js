export default class IncorrectRequisition extends ErrorBase{
  constructor(message = "Um ou mais dados fornecidos estão incorretos"){
    super(message, 400);
  }
}
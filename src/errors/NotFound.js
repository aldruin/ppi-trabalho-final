export default class NotFound extends ErrorBase {
  constructor(message = "Página não encontrada"){
    super(message, 404);
  }
}
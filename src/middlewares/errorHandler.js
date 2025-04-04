import ErrorBase from "../errors/ErrorBase.js";
import IncorrectRequisition from "../errors/IncorrectRequisition.js";
import ValidationError from "../errors/ValidationError.js";

export default function errorHandler(error, req, res, next){
if (error instanceof ValidationError){
  error.sendResponse(res);
}
else if (error instanceof IncorrectRequisition){
  error.sendResponse(res);
}
else if (error instanceof ErrorBase){
  error.sendResponse(res);
}
else{
  new ErrorBase("Erro interno do servidor", 500).sendResponse(res);
}
}
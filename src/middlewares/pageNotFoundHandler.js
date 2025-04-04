import NotFound from "../errors/NotFound.js";

export default function pageNotFoundHandler(req, res, next){
  const error404 = new NotFound();
  next (error404);
}
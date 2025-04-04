import IncorrectRequisition from "../errors/IncorrectRequisition.js";

export default async function paginar(req, res, next){
  try{
    let {limit = 5, page = 1, ordenation = "_id:-1" } = req.query;

    let [ordenationInput, order] = ordenation.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    const result = req.result;

    if (limit > 0 && page > 0){
      const paginatedResult = await result.find()
      .sort({ [ordenationInput]: order})
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

      res.status(200).json(paginatedResult);
    } else{
      next(new IncorrectRequisition());
    }
  } catch(error){
    next(error);
  }
}
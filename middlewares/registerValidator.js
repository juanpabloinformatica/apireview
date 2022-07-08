// import {}
import { validationResult } from "express-validator";
export const registerValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty() == false) {
    return res.json({ errors: errors.array()});
  } else {
    next();
  }
};

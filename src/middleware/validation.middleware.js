import appError from "../utils/appError.js";
const validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query };
    const result = schema.validate(data, {
      abortEarly: false,
    });

    if (result.error) {
      const err = appError.create(
        result.error.details.map((error) => error.message),
        400
      );

      return next(err);
    }

    return next();
  };
};
export default validation;

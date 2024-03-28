import joi from "joi";

export const registrationSchema = joi
  .object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
    age: joi.number().min(10).max(85),
    gender: joi.string().valid("male", "female"),
  })
  .required();

export const forgetPassowrdSceham = joi
  .object({
    email: joi.string().email().required(),
  })
  .required();

export const resetPasswordSchema = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
    code: joi.number().integer().positive().required().min(100000).max(999999),
  })
  .required();

export const loginSchema = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
  .required();

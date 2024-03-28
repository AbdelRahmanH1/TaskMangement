import joi from "joi";
import { Types } from "mongoose";

export const addTaskSchema = joi
  .object({
    title: joi.string().required(),
    description: joi.string(),
  })
  .required();

export const getIdSchema = joi
  .object({
    id: joi
      .custom((value, helper) => {
        if (Types.ObjectId.isValid(value)) return true;
        else return helper.message("Invalid Id");
      })
      .required(),
  })
  .required();

export const updateTask = joi.object({
  id: joi.custom((value, helper) => {
    if (Types.ObjectId.isValid(value)) return true;
    else helper.message("invalid id");
  }),
  title: joi.string(),
  description: joi.string(),
});

import { Router } from "express";
import * as taskController from "./task.controller.js";
import { addTaskSchema, getIdSchema, updateTask } from "./task.schema.js";
import validation from "../../middleware/validation.middleware.js";
import { auth } from "../../middleware/auth.middleware.js";
const router = Router();

router
  .route("/add")
  .post(auth, validation(addTaskSchema), taskController.addTask);

router
  .route("/delete/:id")
  .delete(auth, validation(getIdSchema), taskController.deleteTask);

router
  .route("/update/:id")
  .patch(auth, validation(updateTask), taskController.updateTask);

router
  .route("/done/:id")
  .patch(auth, validation(getIdSchema), taskController.taskDone);

router.route("/getall").get(auth, taskController.getAllTask);

router.route("/complete").get(auth, taskController.getAllTaskCompleted);

router.route("/uncomplete").get(auth, taskController.getAllTaskUncomplete);

export default router;

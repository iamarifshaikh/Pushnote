import { Router } from "express";
import * as employee from "../controllers/employee.js";
import * as employer from "../controllers/employer.js";
import * as task from "../controllers/task.js";
import employerAuthorization from "../middleware/employer/authorization.js";
import employeeAuthorization from "../middleware/employee/authorization.js";

const router = new Router();

router.post("/employee/signup", employee.SignUp);
router.post("/employee/login", employee.logIn);
router.post("/employee/logout", employee.logout);
router.post("/employee/oauth/signup", employee.GoogleSignUp);
router.post("/employee/oauth/login", employee.GoogleSignIn);
router.post(
  "/employee/join-workspace",
  employeeAuthorization,
  employee.joinWorkspace
);

router.post("/employer/signup", employer.Singup);
router.post("/employer/login", employer.Login);
router.post("/employer/logout", employer.logout);

router.post("/task/add", employerAuthorization, task.AddTask);
router.post("/task/update", employerAuthorization, task.UpdateTask);
router.post("/task/gettasks", employerAuthorization, task.GetAllTask);
router.post("/task/delete", employerAuthorization, task.DeleteTask);

export default router;

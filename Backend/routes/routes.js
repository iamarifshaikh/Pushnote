import { Router } from "express";
import * as employee from "../controllers/employee.js";
import * as employer from "../controllers/employer.js";
import * as task from "../controllers/task.js";

const router = new Router();

router.post("/employee/signup", employee.SignUp);
router.post("/employee/login", employee.logIn);
router.get("/employee/logout", employee.logout);
router.post("/employee/oauth/signup", employee.GoogleSignUp);
router.post("/employee/oauth/login", employee.GoogleSignIn);

router.post("/employer/signup", employer.Singup);
router.post("/employer/login", employer.Login);
router.get("/employer/logout", employer.logout);

router.post("/task/add", task.AddTask);
router.post("/task/update", task.UpdateTask);
router.post("/task/gettasks", task.GetAllTask);
router.post("/task/delete", task.DeleteTask);

export default router;

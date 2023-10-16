import { Router } from "express";
import * as employee from "../controllers/employee/employee.js";
import * as employer from "../controllers/employer/employer.js";

const router = new Router();

router.post("/employee/signup", employee.SignUp);
router.post("/employee/login", employee.logIn);
router.post("/employee/logout", employee.logout);
router.post("/employee/oauth/signup", employee.GoogleSignUp);
router.post("/employee/oauth/login", employee.GoogleSignIn);

router.post("/employer/signup", employer.Singup);
router.post("/employer/login", employer.Login);
router.post("/employer/logout", employer.logout);

export default router;

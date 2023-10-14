import { Router } from "express";
import * as employee from "../controllers/employee/employee.js";

const router = new Router();

router.post("/employee/signup", employee.SignUp);
router.post("/employee/login", employee.logIn);
router.post("/employee/logout", employee.logout);

export default router;

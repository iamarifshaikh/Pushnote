import jwt from "jsonwebtoken";
import bcrypt, { compareSync } from "bcrypt";
import Employer from "../models/Employer.js";
import { Problem, Success } from "../constant/Message.js";

/**
 * @route {POST} /api/employer/signup
 * @description Register a new user
 * @access public
 */
export const Singup = async (request, response, next) => {
  try {
    const encryptPassword = bcrypt.hashSync(request.body.password, 10);
    const newEmployer = new Employer({ ...request.body, password: encryptPassword });

    const employer = await Employer.findOne({ email: request.body.email });

    if (employer) return next(Problem(400, "You are already an Employer!"));

   const createdEmployer  = await newEmployer.save();
   const code = request.body.workSpaceName.slice(0,3) + createdEmployer._id.toString().slice(-5);
   await Employer.findByIdAndUpdate(createdEmployer._id, {workSpaceCode: code})

    const successResponse = new Success(200, "Now you are an employer!");

    response.status(successResponse.status).json(successResponse.message);
  } catch (error) {
    console.log(error);
    return next(Problem(500, "Internal Error!"));
  }
};

/**
 * @route {POST} /api/employer/login
 * @description login as a existing user.
 * @access public
 */
export const Login = async (request, response, next) => {
  try {
    const employer = await Employer.findOne({ email: request.body.email });

    if (!employer) return next(Problem(400, "You are not an Employer!"));

    const isPasswordCorrect = compareSync(
      request.body.password,
      employer.password
    );

    if (!isPasswordCorrect) return next(Problem(400, "Password incorrect!"));

    const token = jwt.sign({ employerId: employer._id }, process.env.SECRET, {
      expiresIn: "2h",
    });

    response.cookie("Token", token, {
      httpOnly: true,
      maxAge: 120 * 120 * 1000,
    });

    const sendSuccessReponse = new Success(200, "Successfully login!");
    sendSuccessReponse.token = token;

    response.status(sendSuccessReponse.status).json(sendSuccessReponse.message);
  } catch (error) {
    console.log(error);
    return next(Problem(500, "Internal Error!"));
  }
};

/**
 * @route {GET} /api/employer/logout
 * @description Logout  from the application
 * @access protected
 */
export const logout = async (request, response, next) => {
  response.cookie("Token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  const successResponse = new Success(
    200,
    "Logout from the application successfully!"
  );
  response.status(successResponse.status).json(successResponse.message);
};

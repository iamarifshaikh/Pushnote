import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Problem, Success } from "../constant/Message.js";
import Employee from "../models/Employee.js";
import Employer from "../models/Employer.js";
import axios from "axios";
import { io } from "../index.js";

/**
 * @route {POST} /api/employee/signup
 * @description Register a new user
 * @access public
 */
export const SignUp = async (request, response, next) => {
  try {
    const encryptPassword = bcrypt.hashSync(request.body.password, 10);
    const newEmployee = new Employee({
      ...request.body,
      password: encryptPassword,
    });

    const employee = await Employee.findOne({ email: request.body.email });

    if (employee)
      return next(Problem(400, "Employee already registered! Please sign in."));

    await newEmployee.save();
    const successResponse = new Success(
      200,
      "Employee Registered Successfully"
    );
    response.status(successResponse.status).json(successResponse.message);
  } catch (error) {
    console.error(error);
    return next(Problem(500, "Internal Server Error!"));
  }
};

/**
 * @route {POST} /api/employee/login
 * @description Login a existing user
 * @access public
 */
export const logIn = async (request, response, next) => {
  try {
    const employee = await Employee.findOne({ email: request.body.email });

    if (!employee) return next(Problem(400, "User Not Found!"));

    const isPasswordCorrect = bcrypt.compare(
      request.body.password,
      employee.password
    );

    if (!isPasswordCorrect) return next(Problem(400, "Password Not Correct!"));

    // If the password is correct, generate a JWT token
    const token = jwt.sign({ employeeId: employee._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    // 1 hour in milliseconds
    response.cookie("Token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    const successResponse = new Success(200, "Successfully Login!");
    successResponse.token = token;

    response.status(successResponse.status).json(successResponse);
  } catch (error) {
    console.error(error);
    return next(Problem(500, "Internal Server Error"));
  }
};

/**
 * @route {GET} /api/employee/logout
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

/**
 * @route {POST} /api/employee/oauth/register
 * @description Register a new user through Google Authentication
 * @access public
 */
export const GoogleSignUp = async (request, response) => {
  try {
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${request.body.googleAccessToken}`,
        },
      })
      .then(async (res) => {
        const userAlreadyExist = await Employee.findOne({
          email: res.data.email,
        });
        if (userAlreadyExist)
          response
            .status(400)
            .json({ message: "Employee already registered! Please sign in." });

        const empData = new Employee({
          firstName: res.data.given_name,
          lastName: res.data.family_name,
          email: res.data.email,
          profilePicture: res.data.picture,
        });

        // Create user in database here.
        await empData.save();

        const successResponse = new Success(
          200,
          "Employee Registered Successfully"
        );
        response.status(successResponse.status).json(successResponse.message);
      })
      .catch((err) => {
        console.error(err);
        return next(Problem(400, "Invalid Info"));
      });
  } catch (err) {
    console.error(err);
    return next(Problem(500, "Internal Server Error"));
  }
};

/**
 * @route {POST} /api/employee/oauth/login
 * @description Login an existing user through Google
 * @access public
 */
export const GoogleSignIn = (request, response) => {
  try {
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${request.body.googleAccessToken}`,
        },
      })
      .then(async (res) => {
        const user = await Employee.findOne({
          email: res.data.email,
        });
        if (!user)
          response
            .status(400)
            .json({ message: "Employee not found! Please sign up." });

        const token = jwt.sign({ employeeId: user._id }, process.env.SECRET, {
          expiresIn: "1h",
        });

        // 1 hour in milliseconds
        response.cookie("Token", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        });

        const successResponse = new Success(200, "Successfully Login!");
        successResponse.token = token;

        response.status(successResponse.status).json(successResponse);
      })
      .catch((err) => {
        console.error(err);
        return next(Problem(400, "Invalid Info"));
      });
  } catch (err) {
    console.error(err);
    return next(Problem(500, "Internal Server Error"));
  }
};

/**
 * @route {POST} /api/employee/join-workspace
 * @description Join a workspace by providing the workspace code
 * @access protected (only accessible to authenticated employees)
 */

export const joinWorkspace = async (request, response, next) => {
  try {
    // Get the workspace code provided by the employee
    const { workSpaceCode } = request.body;

    // Find the employee by their authentication token
    const employee = await Employee.findById(request.body.employeeId);

    if (!employee) {
      return next(Problem(404, "Employee not found"));
    }

    // Find the employer based on the workspace code
    const employer = await Employer.findOne({ workSpaceCode: workSpaceCode });

    if (!employer) {
      return next(Problem(404, "Workspace not found. Please check the code."));
    }

    // Check if the employee is already associated with the employer's workspace
    if (
      employer.employees.some((member) =>
        member.employeeId.equals(employee._id)
      )
    ) {
      return next(Problem(400, "You are already part of this workspace."));
    }

    // Check if the employee is already associated with a workspace
    if (
      employer.employees.includes(
        employee.firstName,
        employee.lastName,
        employee.email,
        employee.profilePicture
      )
    ) {
      return next(Problem(400, "You are already part of a workspace."));
    }

    // Associate the employee with the employer's workspace
    employer.employees.push({
      employeeId: employee._id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
    });
    await employer.save();

    const successResponse = new Success(
      200,
      "Successfully joined the workspace."
    );
    response.status(successResponse.status).json(successResponse.message);
  } catch (error) {
    console.error(error);
    return next(Problem(500, "Internal Server Error."));
  }
};

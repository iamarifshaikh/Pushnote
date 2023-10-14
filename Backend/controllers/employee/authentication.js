import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Problem, Success } from "../../constant/Message.js";
import Employee from "../../schema/employee/authentication.js";

/**
 * @route {POST} /api/register
 * @description Register a new user
 * @access public
 */
export const SignUp = async (request, response, next) => {
  try {
    const encryptPassword = bcrypt.hashSync(request.body.password, 10);
    const newEmployee = new Employee({ ...request.body, encryptPassword });

    const employee = await Employee.findOne({ email: request.body.email });

    if (employee) return next(Problem(400, "Employee Already Registered"));

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
 * @route {POST} /api/login
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
 * @route {POST} /api/oauth/register
 * @description Register a new user through Google
 * @access public
 */
export const GoogleSignUp = (request, response) => {
    axios.get("https://gogleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${request.body.googleAccessToken}`
        }
    }).then((res)=>{
        const userAlreadyExist = "Check if user Already Existed";
        if(userAlreadyExist) response.status(400).json({message: "User already exist! Please sign in."})

        const userData = {
            // User data to be stored in data base
            // Model Key: res.data.[key for different values]
        }

        // Create user in database here.
         const newUser = {};
        // JWT
        const token = jwt.sign({
            email: newUser.email,
            id: newUser._id
        }, "secret", {expiresIn: "1d"})

        response.status(200, {result, token})
    }).catch((err)=>{
       response.status(400, {message: "Invalid Info", error: err})
    })
};

/**
 * @route {POST} /api/login/oauth/register
 * @description Login an existing user through Google
 * @access public
 */
export const GoogleSignIn = (request, response) => {
    axios.get("https://gogleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${request.body.googleAccessToken}`
        }
    }).then(async (res)=>{
        const userAlreadyExist = "Check if user Already Existed";
        if(!userAlreadyExist) response.status(400).json({message: "User does not exist! Please sign up."})

        const token = jwt.sign({
            email: userAlreadyExist.email,
            id: userAlreadyExist._id
        }, "secret", {expiresIn: "1d"})

        response.status(200, {result: userAlreadyExist, token})
        

    }).catch((err)=>[
       response.status(400, {message: "Invalid Info", error: err})
    ])

};

/**
 * @route {POST} /api/logout
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

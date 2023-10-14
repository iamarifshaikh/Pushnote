import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import axios from "axios"
import { Problem, Success } from "../../constant/Message.js";

/**
 * @route {POST} /api/register
 * @description Register a new user
 * @access public
 */
export const SignUp = (request, response) => {};

/**
 * @route {POST} /api/login
 * @description Login a existing user
 * @access public
 */
export const SignIn = (request, response) => {};

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
    }).then((res)=>{
        const userAlreadyExist = "Check if user Already Existed";
        if(!userAlreadyExist) response.status(400).json({message: "User does not exist! Please sign up."})
    })

};

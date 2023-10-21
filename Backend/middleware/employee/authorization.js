import jwt from "jsonwebtoken";
import { Problem, Success } from "../../constant/Message.js";

const employeeAuthorization = async (request, response, next) => {
  try {
    const token = await request.cookies.Token;

    if (!token) {
      const failedResponse = new Problem(401, "Access denied");
      return response
        .status(failedResponse.status)
        .json(failedResponse.message);
    }

    jwt.verify(token, process.env.SECRET, async (error, decodedToken) => {
      if (error) {
        return response.status(403).json({ error: "Invalid token" });
      }
      // Store the user's ID in the request
      request.employeeId = decodedToken.employeeId;
      // Token is valid, proceed to the next middleware/route
      next();
    });
  } catch (error) {
    console.error(error);
    return next(Problem(400, "Something went wrong!"));
  }
};

export default employeeAuthorization;

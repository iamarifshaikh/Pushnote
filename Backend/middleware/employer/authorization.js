import { Success, Problem } from "../../constant/Message.js";
import jwt from "jsonwebtoken";

const employerAuthorization = async (request, response, next) => {
  try {
    const token = await request.cookies.token;
    if (token) {
      return next(Problem(401, "Unauthorized. Employer token missing!"));
    }

    jwt.verify(token, process.env.SECRET, async (error, decodedToken) => {
      if (error) {
        return response.status(403).json({ error: "Invalid token" });
      }
      // Attach the employer object to the request for further use in route handlers
      request.employerId = decodedToken.employerId;

      // Continue to the next middleware or route handler
      next();
    });
  } catch (error) {
    console.error(error);
    return next(Problem(500, "Internal Server Error"));
  }
};

export default employerAuthorization;

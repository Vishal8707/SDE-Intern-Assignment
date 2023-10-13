import jwt from "jsonwebtoken";
import userModel from '../Models/userModel.js'

// Middleware for checking if a user is authenticated
export const isAuthenticated = async function (req, res, next) {
  try {
    // Check if the token is present in the request headers
    let token = req.headers["x-api-key"];

    if (!token) {
      return res
        .status(401)
        .send({ status: false, msg: "Token must be provided." });
    }

    try {
      // Verify the token with a secret key (change this key to a secure value)
      let decodedToken = jwt.verify(token, "very-very-secret-key");

      if (!decodedToken) {
        return res.status(400).send({
          status: false,
          msg: "Invalid token. Please enter a valid token.",
        });
      }

      // Attach the decoded token to the request for future use
      req.decodedToken = decodedToken;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(400).send({
          status: false,
          msg: "Invalid token. Please enter a valid token.",
        });
      } else {
        return res
          .status(500)
          .send({ status: false, msg: "Internal server error." });
      }
    }
  } catch (err) {
    console.log("Authentication error", err.message);
    res.status(500).send({ status: false, msg: err.message });
  }
};

// Middleware for checking authorization based on user ID
export const isAuthorized = async function (req, res, next) {
  try {
    // Get the user ID of the logged-in user from the decoded token
    let userLoggedIn = req.decodedToken.userId;
    
    // Get the user ID from the request body
    let userId = req.body.user;
   
    // Check if the user with the specified ID exists
    let checkUserId = await userModel.findById(userId);

    if (!checkUserId)
      return res.status(400).send({ status: false, message: "User not found." });

    // Check if the logged-in user's ID matches the requested user's ID
    if (checkUserId._id != userLoggedIn)
      return res.status(403).send({
        status: false,
        msg: "Login users are not allowed to make changes for other users.",
      });

    // If all checks pass, proceed with the request
    next();
  } catch (err) {
    console.log("Authorization error", err.message);
    return res.status(500).send({ status: false, msg: err.message });
  }
};
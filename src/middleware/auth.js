import jwt from "jsonwebtoken";
import userModel from '../Models/userModel.js'

// ----------------------------------------------------isAuthenticated---------------------------------------------------

export const isAuthenticated = async function (req, res, next) {
  try {
    // Check if the token is present
    let token = req.headers["x-api-key"];

    if (!token) {
      return res
        .status(401)
        .send({ status: false, msg: "Token must be provided." });
    }

    try {
    // Verify the token
    let decodedToken = jwt.verify(token, "very-very-secret-key");
    if (!decodedToken) {
      return res.status(400).send({
        status: false,
        msg: "Invalid token. Please enter a valid token.",
      });
    }
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
    res.status(500).send({ status: false, msg: err.message });
  }
};

// ----------------------------------------------------authorization---------------------------------------------------

export const authorization = async function (req, res, next) {
  try {
    let userLoggedIn = req.decodedToken.userId;
    let userId = req.params.userId;
   
    let checkUserId = await userModel.findById(userId);

    if (!checkUserId)
      return res.status(400).send({ status: false, message: "User not Found" });
    if (checkUserId._id != userLoggedIn)
      return res.status(403).send({
        status: false,
        msg: "Login users are not allowed to modify changes.",
      });
    next();
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.messge });
  }
};
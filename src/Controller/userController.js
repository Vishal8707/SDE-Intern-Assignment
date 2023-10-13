import userModel from "../Models/userModel.js";
import {
  validateName,
  validateEmail,
  validatePassword
} from "../validation/validate.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";

// Function for user registration (Sign Up)
export const userSignUp = async function (req, res) {
  try {
    const data = req.body;
    data.password = data.password.trim();
    const { name, email, password } = data;

    // Check if the request body is empty
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Request body can't be empty" });

    // Check for a valid name
    if (!name)
      return res.status(400).send({
        status: false,
        message: "Please provide your name, or it can't be empty.",
      });

    if (!validateName(name))
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid name" });

    // Check for a valid email
    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "Email is mandatory" });

    if (!validateEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid email" });

    // Check if the email is already registered
    let checkEmailId = await userModel.findOne({ email: email });

    if (checkEmailId) {
      return res.status(400).send({
        status: false,
        message: "This email Id is already registered.",
      });
    }

    // Check for a valid password
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "Password is mandatory." });

    if (!validatePassword(password))
      return res.status(400).send({
        status: false,
        message:
          "Please provide a valid password; it should contain uppercase and lowercase alphabets, numbers, and special characters and be 8–15 characters long.",
      });

    // Hash the password and create the user
    let hashing = bcrypt.hashSync(password, 8);
    data.password = hashing;

    let savedata = await userModel.create(data);

    return res.status(201).send({
      status: true,
      message: "User created successfully.",
      data: savedata,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// Function for user login (Sign In)
export const userSignIn = async function (req, res) {
  try {
    const data = req.body;
    data.password = data.password.trim();
    let { email, password } = data;

    // Check if the request body is empty
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please input user details" });
    }

    // Check for a valid email
    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: "EmailId is mandatory" });
    }

    if (!validateEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "EmailId should be valid" });
    }

    // Check if the user exists
    let verifyUser = await userModel.findOne({ email: email });
    if (!verifyUser) {
      return res.status(400).send({ status: false, message: "User not found" });
    }

    // Verify the password
    let hash = verifyUser.password;
    let isCorrect = bcrypt.compareSync(password, hash);
    if (!isCorrect)
      return res
        .status(400)
        .send({ status: false, message: "Password is incorrect" });

    // Create a JSON Web Token (JWT) for authentication
    let payload = { userId: verifyUser["_id"], iat: Date.now() };
    let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.setHeader("x-api-key", token);
    return res.status(200).send({
      status: true,
      message: "User login successful",
      data: { userId: verifyUser["_id"], token },
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// Function to get user details
export const getUsers = async function (req, res) {
  try {
    let userId = req.decodedToken.userId;

    if (!isValidObjectId(userId))
      return res
        .status(400)
        .send({ status: false, message: "User is invalid" });

    let getData = await userModel.findOne({ _id: userId });

    if (!getData)
      return res.status(404).send({ status: false, message: "User not found" });

    return res
      .status(200)
      .send({ status: true, message: "User profile details", data: getData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
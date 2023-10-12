import userModel from "../Models/userModel.js";
import {
  validateName,
  validateEmail,
  validatePassword
} from "../validation/validate.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignUp = async function (req, res) {
  try {
    const data = req.body;
    data.password = data.password.trim();
    const { fullName, email, password } = data;

    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: " request body can't be empty" });

    if (!fullName)
      return res.status(400).send({
        status: false,
        message: "Please provide your fullName, or it can't be empty.",
      });

    if (!validateName(fullName))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid  fullName" });

    if (!email)
      return res
        .status(400)
        .send({ status: false, messsage: "Email is mandatory" });

    if (!validateEmail(email))
      return res
        .status(400)
        .send({ status: false, messsage: "Please provide a valid email" });

    let checkEmailId = await userModel.findOne({ email: email });

    if (checkEmailId) {
      return res.status(400).send({
        status: false,
        message: "This email Id is already registered.",
      });
    }
    if (!password)
      return res
        .status(400)
        .send({ status: false, messsage: "Paasword is mandatory." });

    if (!validatePassword(password))
      return res.status(400).send({
        status: false,
        messsage:
          "Please provide a valid password; it should contain uppercase and lowercase alphabets, numbers, and special characters and be 8–15 characters long.",
      });

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


export const userSignIn = async function (req, res) {
  try {
    const data = req.body;
    data.password = data.password.trim();
    let { email, password } = data;

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please input user Details" });
    }

    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: "EmailId is mandatory" });
    }

    if (!validateEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "EmailId should be Valid" });
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: false, message: "Password is mandatory" });
    }

    let verifyUser = await userModel.findOne({ email: email });
    if (!verifyUser) {
      return res.status(400).send({ status: false, message: "user not found" });
    }

    let hash = verifyUser.password;

    let isCorrect = bcrypt.compareSync(password, hash);
    if (!isCorrect)
      return res
        .status(400)
        .send({ status: false, message: "Password is incorrect" });

    let payload = { userId: verifyUser["_id"], iat: Date.now() };
    let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.setHeader("x-api-key", token);
    return res.status(200).send({
      status: true,
      message: "User login successfull",
      data: { userId: verifyUser["_id"], token },
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


export const getUsers = async function (req, res) {
  try {
    let userId = req.params.userId;

    if (!isValidObjectId(userId))
      return res
        .status(400)
        .send({ status: false, message: "User is invalid" });

    let getData = await userModel.findOne({ _id: userId });

    if (!getData)
      return res.status(404).send({ status: false, message: "user not found" });

    return res
      .status(200)
      .send({ status: true, message: "User profile details", data: getData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
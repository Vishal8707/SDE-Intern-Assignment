import memberModel from "../Models/memberModel.js";
import { isValidObjectId } from "mongoose";

// Function to create a new member
export const createMembers = async function (req, res) {
  try {
    const data = req.body;
    const { community, user, role } = data;

    // Check if the request body is empty
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Request body can't be empty" });

    // Check if community, user, and role are valid ObjectIds
    if (!isValidObjectId(community))
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid community ID" });

    if (!isValidObjectId(user))
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid user ID" });

    if (!isValidObjectId(role))
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid role ID" });

    // Create the member and save it
    let savedata = await memberModel.create(data);

    return res.status(201).send({
      status: true,
      message: "Member created successfully.",
      data: savedata,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// Function to mark a member as deleted
export const deleteMember = async function (req, res) {
  try {
    let id = req.params.id;
   
    // Mark the member as deleted
    let deleteData = await memberModel.findOneAndUpdate(
      { _id: id },
      {
        isDeleted: true,
      },
      { new: true }
    );
    return res.status(201).send({status:false, message:"Member ID deleted successfully", data:deleteData})
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
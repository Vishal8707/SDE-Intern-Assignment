import memberModel from "../Models/memberModel.js";
import { isValidObjectId } from "mongoose";



export const createMembers = async function (req, res) {
  try {
    const data = req.body;
    const {community,user,role  } = data;

    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: " request body can't be empty" });


    if (!isValidObjectId(community))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid  name" });
        
        if (!isValidObjectId(user))
        return res
          .status(400)
          .send({ status: false, message: "Please provide valid  name" });

          if (!isValidObjectId(role))
          return res
            .status(400)
            .send({ status: false, message: "Please provide valid  name" });   

    let savedata = await memberModel.create(data);

    return res.status(201).send({
      status: true,
      message: "member created successfully.",
      data: savedata,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

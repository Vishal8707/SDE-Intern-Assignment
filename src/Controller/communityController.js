import communityModel from "../Models/communityModel.js";
import { validateName } from "../validation/validate.js";

import { isValidObjectId } from "mongoose";

export const createCommunity = async function (req, res) {
  try {
    const data = req.body;
    const { name, slug, owner } = data;
    data.slug = name;

    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: " request body can't be empty" });

    if (!name)
      return res.status(400).send({
        status: false,
        message: "Please provide your name, or it can't be empty.",
      });

    if (!validateName(name))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid  name" });

    if (!isValidObjectId(owner))
      return res.status(400).send({
        status: false,
        message: "Please provide valid ObjectId, or it can't be empty.",
      });

    let savedata = await communityModel.create(data);

    return res.status(201).send({
      status: true,
      message: "Community created successfully.",
      data: savedata,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

export const getAll = async function (req, res) {
  try {
    let findAll = await communityModel.find();
    
    if (!findAll)
      return res
        .status(404)
        .send({ status: false, message: "There are not any communities." });
    return res.status(201).send({status:true, data:findAll})

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};


export const getMemberByid = async function (req, res) {
    try {
      let id = req.params.name
      let findMember = await communityModel.find(id).select();
      
      if (!findMember)
        return res
          .status(404)
          .send({ status: false, message: "There are not any communities with this id." });
      return res.status(201).send({status:true, data:findMember})
  
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };
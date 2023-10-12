import communityModel from "../Models/communityModel.js";
import memberModel from "../Models/memberModel.js";
import roleModel from "../Models/roleModel.js";
import userModel from "../Models/userModel.js";
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

    const checkOwner = await communityModel.findOne({
      owner: owner,
      name: name,
    });

    if (checkOwner)
      return res.status(400).send({
        status: false,
        message: `This owner is already exist with this community ${checkOwner.name}`,
      });

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
    return res.status(201).send({ status: true, data: findAll });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

export const getMemberByid = async function (req, res) {
  try {
    const data = req.params.id;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const findCommunity = await communityModel
      .find({ name: data })
      .skip(skip)
      .limit(limit)
      .select({ __v: 0, name: 0, slug: 0, createdAt: 0, updatedAt: 0 });

    const total = await communityModel.countDocuments();
    const pages = Math.ceil(total / limit);

    if (!findCommunity) {
      return res.status(404).send({
        status: false,
        message: "There are not any communities with this id.",
      });
    }

    const ownerKeys = findCommunity.map((community) => community.owner);

    const findUsers = await userModel
      .find({ _id: { $in: ownerKeys } })
      .select({ email: 0, password: 0, createdAt: 0, updatedAt: 0, __v: 0 });

    const checkMember = await memberModel
      .find({ user: { $in: ownerKeys } })
      .select({ email: 0, password: 0, createdAt: 0, updatedAt: 0, __v: 0 });

    const roleKeys = checkMember.map((community) => community.role);

    const checkRole = await roleModel
      .find({ _id: { $in: roleKeys } })
      .select({ email: 0, password: 0, createdAt: 0, updatedAt: 0, __v: 0 });

    return res.status(201).send({
      status: true,
      content: {
        meta: {
          total,
          pages,
          page,
        },
      },
      data: [
        {
          _id: checkMember[0]._id,
          community: findCommunity[0]._id,
          user: findUsers[0],
          role: checkRole[0],
        },
        {
          _id: checkMember[1]._id,
          community: findCommunity[1]._id,
          user: findUsers[1],
          role: checkRole[1],
        },
        // {
        //   _id: checkMember[2]._id,
        //   community: findCommunity[2]._id,
        //   user: findUsers[2],
        //   role: checkRole[2],
        // },
      ],
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

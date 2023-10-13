import communityModel from "../Models/communityModel.js";
import memberModel from "../Models/memberModel.js";
import roleModel from "../Models/roleModel.js";
import userModel from "../Models/userModel.js";
import { validateName } from "../validation/validate.js";
import { isValidObjectId } from "mongoose";

// Create a new community
export const createCommunity = async function (req, res) {
  try {
    const data = req.body;
    const { name, slug, owner } = data;
    data.slug = name;

    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Request body can't be empty" });

    if (!name)
      return res.status(400).send({
        status: false,
        message: "Please provide a name, as it can't be empty.",
      });

    if (!validateName(name))
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid name" });

    const checkOwner = await communityModel.findOne({
      owner: owner,
      name: name,
    });

    if (checkOwner)
      return res.status(400).send({
        status: false,
        message: `This owner is already associated with the community: ${checkOwner.name}`,
      });

    if (!isValidObjectId(owner))
      return res.status(400).send({
        status: false,
        message: "Please provide a valid ObjectId for the owner",
      });

    let savedData = await communityModel.create(data);

    return res.status(201).send({
      status: true,
      message: "Community created successfully.",
      data: savedData,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// Get all communities
export const getAll = async function (req, res) {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    
    const findAll = await communityModel.find();

    const total = await communityModel.countDocuments();
    const pages = Math.ceil(total / limit);

    if (!findAll)
      return res
        .status(404)
        .send({ status: false, message: "There are no communities." });

    return res.status(201).send({
      status: true,
      content: {
        meta: {
          total,
          pages,
          page,
        },
      },
      data: findAll,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

// Get members of a community by community name
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
        message: "There are no communities with this name.",
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

    const result = {
      status: true,
      content: {
        meta: {
          "total" : total,
          "pages" : pages,
          "page" : page,
        },
        data: checkMember.map((member, index) => {
        return {
          _id: member._id,
          community: findCommunity[index]._id,
          user: findUsers[index],
          role: checkRole[index],
        };
      })
    },
    };

    return res.status(201).send(result);
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

export const getMyOwnCommunity = async function (req, res) {
  try {
    // Extract user ID from the request parameters
    let userId = req.params.userId;

    // Get pagination parameters from the query or use defaults
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    // Find communities owned by the specified user
    const findCommunity = await communityModel
      .find({ owner: userId })
      .skip(skip)
      .limit(limit)
      .select({ __v: 0 });

    // Calculate the total number of communities and the number of pages
    const total = await communityModel.countDocuments({ owner: userId });
    const pages = Math.ceil(total / limit);

    // If no communities are found, return a 404 response
    if (!findCommunity) {
      return res.status(404).send({
        status: false,
        message: "There are no communities owned by this user.",
      });
    }

    // Create a response object with pagination information and the community data
    const response = {
      status: true,
      content: {
        meta: {
          "total" : total,
          "pages" : pages,
          "page" : page,
        },
      },
      data: findCommunity,
    };

    // Send a 200 OK response with the result
    return res.status(200).send(response);
  } catch (err) {
    // Handle any errors and send a 500 Internal Server Error response
    return res.status(500).send({ status: false, message: err.message });
  }
};

export const getMyJoinedCommunity = async function (req, res) {
  try {
    // Extract user ID from the request parameters
    let userId = req.params.userId;

    // Get pagination parameters from the query or use defaults
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    // Find communities joined by the specified user
    const findCommunity = await communityModel
      .find({ members: userId })
      .skip(skip)
      .limit(limit)
      .select({ __v: 0 });

    // Calculate the total number of communities and the number of pages
    const total = await communityModel.countDocuments({ members: userId });
    const pages = Math.ceil(total / limit);

    // If no communities are found, return a 404 response
    if (!findCommunity) {
      return res.status(404).send({
        status: false,
        message: "There are no communities joined by this user.",
      });
    }

    // Create a response object with pagination information and the community data
    const response = {
      status: true,
      content: {
        meta: {
          "total" : total,
          "pages" : pages,
          "page" : page,
        },
      },
      data: findCommunity,
    };

    // Send a 200 OK response with the result
    return res.status(200).send(response);
  } catch (err) {
    // Handle any errors and send a 500 Internal Server Error response
    return res.status(500).send({ status: false, message: err.message });
  }
};
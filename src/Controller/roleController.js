import roleModel from "../Models/roleModel.js";
import { validateName } from "../validation/validate.js";

// Function to create a new role
export const createRole = async function (req, res) {
  try {
    const data = req.body;
    const { name } = data;

    // Check if the request body is empty
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Request body can't be empty" });

    // Check for a valid name
    if (!name)
      return res.status(400).send({
        status: false,
        message: "Please provide a name, or it can't be empty.",
      });

    if (!validateName(name))
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid name" });

    // Create the role and save it
    let savedata = await roleModel.create(data);

    return res.status(201).send({
      status: true,
      message: "Role created successfully.",
      data: savedata,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// Function to get a list of all roles with pagination
export const getallRole = async function (req, res) {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    // Find roles with pagination
    const findAll = await roleModel.find().skip(skip).limit(limit);
    const total = await roleModel.countDocuments();
    const pages = Math.ceil(total / limit);

    if (!findAll) {
      return res
        .status(404)
        .send({ status: false, message: "There are no roles available." });
    }

    return res.status(201).send({
      status: true,
      content: {
        meta: {
          total,
          pages,
          page,
        },
        data: findAll,
      },
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
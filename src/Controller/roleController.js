import roleModel from "../Models/roleModel.js";
import {
  validateName,

} from "../validation/validate.js";



export const createRole = async function (req, res) {
  try {
    const data = req.body;
    const { name } = data;

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

    let savedata = await roleModel.create(data);

    return res.status(201).send({
      status: true,
      message: "role created successfully.",
      data: savedata,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};


export const getallRole = async function (req, res) {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const findAll = await roleModel.find().skip(skip).limit(limit);
    const total = await roleModel.countDocuments();
    const pages = Math.ceil(total / limit);

    if (!findAll) {
      return res
        .status(404)
        .send({ status: false, message: "There are not any role." });
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

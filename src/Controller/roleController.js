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

import {Request, Response} from "express";
import {pool} from "../../config/db";
import {userServices} from "./user.service";

// post method for users => from users.service.ts
const createUser = async (req: Request, res: Response) => {
  const {name, email} = req.body;
  try {
    const result = await userServices.createUser(name, email);
    // console.log(result.rows[0]);
    res.status(201).json({
      // res.send ja kore //res.status.json({same vabe kaj kore})
      success: true,
      message: "Data inserted",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// get method for All users => from users.service.ts
const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();

    res.status(201).json({
      success: true,
      message: "data received",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

// get single users => from users.service.ts
const getSingleUser = async (req: Request, res: Response) => {
  //   console.log(req.params.id);
  try {
    const result = await userServices.getSingleUser(req.params.id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

// update user
const updateUser = async (req: Request, res: Response) => {
  const {name, email} = req.body;
  try {
    const result = await userServices.updateUser(
      name,
      email,
      req.params.id as string
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

// delete user
const deleteUser = async (req: Request, res: Response) => {
  // console.log(req.params.id);
  try {
    const result = await userServices.deleteUser(req.params.id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: null,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

export const userControllers = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};

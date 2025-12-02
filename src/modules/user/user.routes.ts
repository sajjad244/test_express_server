import {Request, Response, Router} from "express";
import {pool} from "../../config/db";
import {userControllers} from "./user.controller";

const router = Router();

// Address look like ---> localhost:5000/users (server.ts e eti app.use e bebohar korechi tai eta root mane just "/")

//! app.use("/users",userRoutes) in [service.ts]
//! MODULAR PARTAN [routes -> controller -> service]

// post method for users => from users.controller.ts
router.post("/", userControllers.createUser);

// get method for All users => from users.controller.ts
router.get("/", userControllers.getUser);

// get single users => from users.controller.ts
router.get("/:id", userControllers.getSingleUser);

// update user
router.put("/:id", userControllers.updateUser);

// delete user
router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;

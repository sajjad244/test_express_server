import express, {Request, Response} from "express";
import config from "./config";
import initDB, {pool} from "./config/db";
import {userRoutes} from "./modules/user/user.routes";

const app = express();
// initializing port --> from config --> index.ts
const port = config.port;

// parse json
app.use(express.json());

// initializing db --> from config --> db.ts (also --> pool)
initDB();

// ! user CRUD operations
//address look like --> localhost:5000/users
app.use("/users", userRoutes);

// ! For server //!

app.get("/", (req: Request, res: Response) => {
  res.send("Hell No!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

import { Router } from "express";
import { getUsers } from "../controllers/users.controller";
import { createUser } from "../controllers/users.controller";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);


export default router;



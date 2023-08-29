import { Router } from "express";
import { getUsers, getPremium, deleteUser } from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers);
router.put("/premium/:uid", getPremium);
router.delete("/:uid", deleteUser);

export default router;

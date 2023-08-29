import { Router } from "express";
import { getUsers, getPremium, deleteUser } from "../controllers/users.controller.js";
import { authUser, authAdmin, authPremium } from '../Utils.js'
const router = Router();

router.get("/", authAdmin, getUsers);
router.put("/premium/:uid",authAdmin, getPremium);
router.delete("/:uid", authAdmin, deleteUser);

export default router;

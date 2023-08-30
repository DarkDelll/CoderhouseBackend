import { Router } from "express";
import { getUsers, getPremium, deleteUser, deleteInactives } from "../controllers/users.controller.js";
import { authUser, authAdmin, authPremium } from '../Utils.js'
const router = Router();

router.get("/", authAdmin, getUsers);
router.put("/premium/:uid",authAdmin, getPremium);
router.delete("/inactives", authAdmin, deleteInactives)
router.delete("/:uid", authAdmin, deleteUser);

export default router;

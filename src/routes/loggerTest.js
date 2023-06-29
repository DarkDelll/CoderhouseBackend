import { Router } from "express";

const router = Router();

router.get("/", (req,res)=>{
    req.logger.debug("Prueba de debuggin")
    req.logger.warning("Prueba de warning")
    req.logger.error("Prueba de error")
    req.logger.fatal("Prueba error fatal")
    res.send("Prueba de logger!");
})

router.get("/production", (req,res)=>{
    req.logger.debug("Prueba de debuggin")
    req.logger.warn("Prueba de warning")
    req.logger.error("Prueba de error")
    res.send("Prueba de logger!");
})

export default router
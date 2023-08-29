import {Router} from 'express'
import passport from 'passport';
import userDTO from '../services/dto/user.dto.js';
const router = Router();


router.get("/github", passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {});

router.get("/githubcallback", passport.authenticate('github', {failureRedirect: '/github/error'}), async (req, res) => {
    const user = req.user;
    req.session.user= {
        name : `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/github");
});
router.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }),
    async (req, res) => {
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
});

router.post("/login", passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
    const user = req.user;
    const usuario = new userDTO(user)
    if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
     req.session.user = {
         name: usuario.name,
         email: usuario.email,
         age: usuario.age,
         cart: usuario.cart,
         role: usuario.role
        }
        req.user.lastLogin = Date.now();
        req.user.save();
    res.status(200).send({success: "login exitoso"});
});

router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});


export default router
import {Router} from 'express'
import userModel from '../dao/models/users.js'

const router = Router();
import cookieParser from 'cookie-parser';
router.use(cookieParser('HOLACOMO26323'))

router.post('/register', async(req,res)=>{
    const { first_name, last_name, email, age, password} = req.body;

    const exists = await userModel.findOne({email});

    if(exists){
        return res.status(400).send({status:"error", msg:"este usuario ya existe"})
    }
    const user = {
        first_name,
        last_name,
        email,
        age,
        password
    }
    const result = await userModel.create(user);
    res.status(201).send({status:"success", message: "usuario creado con exito "+result.id})

})

router.post('/login',async(req,res)=>{
    const {email, password} = req.body
    const user = await userModel.findOne({email,password})
    if(email === 'adminCoder@coder.com' && password==="adminCod3r123"){
        req.session.user= {
            name : 'Admin',
            email: email,
            age: ""
        }
        req.session.rol={
            rol:'admin'
        }
        return res.send({status:"success", payload:req.session.user, message:"Logeado correctamente" }); 
    }
    if(!user){
        return res.status(401).send({status:"error", msg:"Credenciales incorrectas"})
    }
    
    req.session.user= {
        name : `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    req.session.rol={
        rol:'usuario'
    } 
    res.send({status:"success", payload:req.session.user, message:"Logeado correctamente" });
})

export default router
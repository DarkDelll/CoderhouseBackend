import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));


export const isValidPassword = (user, password )=>{
    return bcrypt.compareSync(password, user.password)
}

const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";


export const generateJWToken = (user)=>{
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'});
}

export function authUser(req,res,next){
    if(req.session.user.role === 'user'){
        return next();
    }
    return res.status(403).send('Usuario no autorizado para visualizar el contenido')
}
export function authAdmin(req,res,next){
    if(req.session.user.role === 'admin'){
        return next();
    }
    return res.status(403).send('Usuario no autorizado para visualizar el contenido')
}


export default __dirname;
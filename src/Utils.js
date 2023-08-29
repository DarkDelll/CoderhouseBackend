import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';


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
    return res.status(403).send('Usuario no autorizado para acceder al contenido')
}
export function authAdmin(req,res,next){
    if(req.session.user.role === 'admin'){
        return next();
    }
    return res.status(403).send('Usuario no autorizado para acceder al contenido')
}
export function authPremium(req,res,next){
    if(req.session.user.role === 'premium'){
        return next();
    }
    return res.status(403).send('Usuario no autorizado para acceder al contenido')
}

export const generateProduct = ()=>{

    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.random.alpha(10),
        price: faker.commerce.price(),
        status: true,
        stock: faker.random.numeric(2),
        category:faker.commerce.department(),
        thumbnails:faker.image.image() }
}


export default __dirname;
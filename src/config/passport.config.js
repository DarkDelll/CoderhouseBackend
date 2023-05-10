import passport from 'passport';
import passportLocal from 'passport-local';
import GitHubStrategy from 'passport-github2';
import userModel from '../dao/models/users.js'
import { createHash, isValidPassword } from '../Utils.js';

const localStrategy = passportLocal.Strategy;

const initializePassport = ()=>{
    
    
    passport.use('github', new GitHubStrategy(
        {
            clientID: 'Iv1.63a6a900e3e27c42', 
            clientSecret: '0242842e011cedb3d3dbbd4a91459e022ef94d9b',
            callbackUrl: 'http://localhost:8080/api/sessions/githubcallback'
        }, 
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await userModel.findOne({email: profile._json.email});
                
                if (!user) {
                    console.warn("User doesn't exists with username: " + profile._json.email);
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: '',
                        age: 18,
                        email: profile._json.email,
                        password: '',
                        loggedBy: "GitHub"
                    };
                    const result = await userModel.create(newUser);
                    return done(null, result);
                } else {
                    return done(null, user);
                }
            } catch (error) {
                return done(error);
            }
        })
    );

  
    passport.use('register', new localStrategy(
       
        { passReqToCallback: true, usernameField: 'email' },
        async(req, username, password, done) =>{
            const { first_name, last_name, email, age } = req.body;
            try {

                const exists = await userModel.findOne({ email });
                if (exists) {
                    console.log("El usuario ya existe.");
                    return done(null, false);
                }
                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                };
                const result = await userModel.create(user);
                
                return done(null, result);
            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }
        }

    ))

    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });
                if (!user) {
                    console.warn("User doesn't exists with username: " + username);
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    console.warn("Invalid credentials for user: " + username);
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });
}


export default initializePassport;
import dotenv from 'dotenv'
import {Command} from "commander"

const program = new Command()
program
    .option('-d', 'modo debug', false)
    .option('-p <port>', 'Puerto del servidor', 8080)
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
program.parse()
console.log("Mode Option: ", program.opts().mode)

const environment = program.opts().mode;

dotenv.config({
    path:environment==="production"?"./src/config/.env.prod":"./src/config/.env.dev"
});

export default{
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    mailing: {
        SERVICE: process.env.MAILING_SERVICE,
        USER: process.env.MAILING_USER,
        PASSWORD: process.env.MAILING_PASSWORD
    },
    environment: environment
}
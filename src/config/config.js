import dotenv from 'dotenv'

dotenv.config({path: '.env'})

export default{
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD
}
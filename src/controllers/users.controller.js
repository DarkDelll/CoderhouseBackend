import { usersService } from "../services/repository/services.js"
import nodemailer from 'nodemailer';
import config from '../config/config.js';

export async function getUsers(req, res) {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send({
      message: error.message
    });
  }
}

export async function getPremium(req, res) {
  try {
    const {
      uid
    } = req.params;
    const user = await usersService.updateUser(uid)
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({message: error.message});
    
  }
}

export async function deleteUser(req, res) {
  try {
    const {
      uid
    } = req.params;
    const user = await usersService.deleteUser(uid);
    res.status(200).send({
      message: "user deleted"
    });
  } catch (error) {
    res.status(404).send({
      message: error.message
    });
  }
}

export async function deleteInactives(req, res){

  try {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    const filter = {lastLogin: {$lt: twoDaysAgo}}
    const users = await usersService.deleteManyUsers(filter)
    if(users.length<1){
      return res.status(404).send({ message: "usuarios no encontrados" })
    }
    const transporter = nodemailer.createTransport({
      service: config.mailing.SERVICE,
      port: 587,
      auth: {
          user: config.mailing.USER,
          pass: config.mailing.PASSWORD
      }
    });
    const mailing = users.map((user)=> {
      const mailOptions = {
        from: "CUENTA ELIMINADA " + config.gmailAccount,
        to: user.email,
        subject: "Su cuenta ha sido suspendida " ,
        html: `<div><h3>Su cuenta ha sido eliminada del sitio por inactividad</h3>`,
        attachments: []
      }
      let result2 = transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            
            res.status(400).send({ message: "Error", payload: error })
        }})
    })

    res.status(200).json({ message: `Se han eliminado ${users.length} usuarios inactivos.` });
  } catch (error) {
     res.status(500).json({ message: 'Error interno del servidor' });
  }

}
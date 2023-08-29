import { usersService } from "../services/repository/services.js"

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
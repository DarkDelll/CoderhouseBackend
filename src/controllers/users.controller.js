import { usersService } from "../services/repository/services.js"

export async function getUsers(req, res) {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({
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
    user.premium = true;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const {
      uid
    } = req.params;
    const user = await usersService.deleteUser(uid);
    res.status(200).json({
      message: "user deleted"
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
}
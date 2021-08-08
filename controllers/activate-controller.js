const Jimp = require("jimp");
const path = require("path");
const UserDto = require("../dto/userDto");
const UserService = require("../services/User-service");

class ActivateController {
  async activate(req, res) {
    const { name, avatar } = req.body;
    if (!name || !avatar) {
      res.status(400).json({ message: "All Fields are required" });
    }

    // Image base64 to image file
    const buffer = Buffer.from(
      avatar.replace(/^data:image\/png;base64,/, ""),
      "base64"
    );

    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpeg`;

    try {
      const jimpResponse = await Jimp.read(buffer);
      jimpResponse
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Could not process the image" });
    }

    // update user
    try {
      const user = await UserService.findUser({ _id: req.user._id });
      if (!user) {
        res.status(404).json({ message: "User not Found" });
      }

      user.activated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;
      user.save();
      res.status(201).json({ user: new UserDto(user), auth: true });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}

module.exports = new ActivateController();

import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // find user with the email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid Credentials" });
    } else {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.status(401).json({ message: "invalid Credentials" });
      } else {
        const token = jwt.sign(
          { userId: user.email, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
        );
        // Set token in cookie
        res.cookie("Authorized", token, { httpOnly: true, maxAge: 172800000 });
        return res.status(200).json({
          ok: true,
          data: {

           token,
          },
          message: "Login successfully",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default loginController;
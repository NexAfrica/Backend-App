import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../Models/user.js';

class signupController {
  static async getUser(req, res) {
    const { fullname, email, password,userName } = req.body;
    if (!fullname || !email || !password || !userName ) {
      return res.status(400).json({
        message: "Names, email, and password, userName are all required",
        
      });
    }
    const duplicate = await User.findOne({ email: req.body.email });
    if (duplicate) {
      return res.status(400).json({
        message: "The email is already taken",
      });
    } else {
      try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const allUsers = await User.find();
        let isAdmin = false;
        if (allUsers.length === 0) {
          isAdmin = true;
        }
        const newUser = await User.create({
          fullname,
          email,
          userName,
          password: hashedPassword,
        });

        // Create token
        const secret = process.env.JWT_SECRET;
        const role = newUser.isAdmin ? "admin" : "user";
        const token = jwt.sign({ id: newUser._id, role }, secret, {
          expiresIn: "7d",
        });

        // Set token in cookie
        res.cookie("Authorized", token, { httpOnly: true, maxAge: 604800 });

        return res.status(201).json({
          message: "Successfully created",
          Authorization: token,
          data: newUser,
          ok: true,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: error.message,
        });
      }
    }
  }

  static async allUsers(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json({
        data: users,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Failed to retrieve users",
      });
    }
  }
}

export default signupController;
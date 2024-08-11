import bcrypt from "bcryptjs";
import User from "../Models/user.js";

const resetPasswordWithOtpController = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist." });
    }

    if (user.otpCode !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otpCode = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Password has been reset successfully." });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default resetPasswordWithOtpController;

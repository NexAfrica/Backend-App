import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import User from "../Models/user.js";

const requestOtpController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist." });
    }

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(1000, 9999).toString();

    // Set OTP and expiration in the user's record
    user.otpCode = otp;
    user.otpExpires = Date.now() + 30000000; // 5 minutes expiration
    await user.save();

    // Send the OTP via email
    await sendEmail(user.email, "Your OTP Code", `Your OTP code is ${otp}. It expires in 5 minutes.`);

console.log(otp)
return res.status(200).json({ message: "OTP sent to email." ,});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default requestOtpController;

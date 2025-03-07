import express from "express";
import requestOtpController from "../Controllers/requestOtpController.js";
import resetPasswordWithOtpController from "../Controllers/resetPasswordWithOtpController.js";

const router = express.Router();

// Route to request an OTP
router.post("/request-otp", requestOtpController);

// Route to reset the password using the OTP
router.post("/reset-password", resetPasswordWithOtpController);

export default router;

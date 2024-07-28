import express from "express";
import signoutController from "../Controllers/signoutController.js";


const router =express.Router();

router.post("/", signoutController);

export default router
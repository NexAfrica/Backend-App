import express from "express"
// import eventRouter from "./eventRoute.js"
import signupRoute from "./signupRoute.js"
import loginRoute from "./loginRoute.js"
import signoutRoute from "./signoutRoute.js"
// import bookingRoute from "./bookingRoute.js"
// import recentRouter from "./recentRoutes.js"

const app =express()

const router = express.Router()

// router.use("/events",eventRouter)
router.use("/signup",signupRoute)
router.use("/login", loginRoute)
router.use("/signout",signoutRoute)
// router.use("/booking",bookingRoute)
// router.use("/recentEvent",recentRouter)


export default router
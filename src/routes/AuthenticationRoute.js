import { Router } from "express"
import usersCtrl from "../controllers/AuthenticationController"

const router = new Router()

// associate put, delete, and get(id)
router.route("/login").post(usersCtrl.login)
router.route("/verify").post(usersCtrl.verify)

export default router

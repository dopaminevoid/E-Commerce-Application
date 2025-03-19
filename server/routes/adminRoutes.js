import e from "express"
import { adminProfile, adminProfileUpdate, adminSignin, adminSignup } from "../controllers/adminController.js"
import { authAdmin } from "../middlewares/authAdmin.js"

const router = e.Router()

router.post('/signup', adminSignup )

router.put('/login', adminSignin )

router.get('/profile', authAdmin, adminProfile  )

router.put('/update',  authAdmin, adminProfileUpdate )

router.put('/deactivate',)

router.get('/logout')

export { router as adminRoutes };
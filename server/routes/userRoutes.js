import e from "express"
import { userSignup, userSignin, userProfile, userLogout, userProfileUpdate } from "../controllers/userController.js"
import { authUser } from "../middlewares/authUser.js"

const router = e.Router()

router.post('/signup', userSignup )

router.put('/login', userSignin)

router.get('/profile', authUser, userProfile )

router.put('/update', authUser, userProfileUpdate )
    
router.put('/deactivate',)

router.get('/logout', userLogout)

export { router as userRoutes };
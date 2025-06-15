import express from 'express';
const userRouter = express.Router(); // ✅ Fix here

import { checkAuth, login, signup, updateProfile } from '../Controller/userController.js';
import { protectROute } from '../MIddelwaRE/auth.js';

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/update-profile", protectROute, updateProfile);
userRouter.post("/check", protectROute, checkAuth);

export default userRouter;

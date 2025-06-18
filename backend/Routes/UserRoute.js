import express from 'express';
const userRouter = express.Router(); // ✅ Fix here

import { checkAuth, login, signup, updateProfile } from '../Controller/userController.js';
import { isLoggedIn  } from '../MIddelwaRE/auth.js';

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile", isLoggedIn , updateProfile);
userRouter.get("/check", isLoggedIn , checkAuth);

export default userRouter;

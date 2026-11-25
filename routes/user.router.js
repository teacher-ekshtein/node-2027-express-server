import { Router } from "express";
import { joiValidator } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../validations/user.validation.js";
import { login, register } from "../controllers/user.controller.js";

const userRouter = Router();

// הרשמה של חדש - register
userRouter.post('/', joiValidator(registerSchema), register);

// התחברות של קיים - login
userRouter.post('/login', joiValidator(loginSchema), login);

export default userRouter;